import { Table } from '@mantine/core';
import { Income } from '../lib/expensive/income';
import { Currency } from '../lib/expensive/currencies';
import { useMemo } from 'react';
import { Category } from '../lib/expensive';

export function IncomeTable({ incomeList, currencies, categories }: { incomeList: Income[]; currencies: Currency[]; categories: Category[] }) {

  const categoriesMap = useMemo(() => {
    return categories.reduce((agg, curr) => {
      agg.set(curr.id, curr.name);
      return agg;
    }, new Map<string, string>());
  }, [categories]);


  const currenciesMap = useMemo(() => {
    return currencies.reduce((agg, curr) => {
      agg.set(curr.id, curr.symbol);
      return agg;
    }, new Map<string, string>());
  }, [currencies]);

  const tableData = incomeList.map((income) => (
    <Table.Tr key={income.id}>
      <Table.Td>{categoriesMap.get(income.categoryId)}</Table.Td>
      <Table.Td>{income.amount}</Table.Td>
      <Table.Td>{currenciesMap.get(income.currencyId)}</Table.Td>
      <Table.Td>{new Date(income.createdOn).toDateString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Category</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Currency</Table.Th>
          <Table.Th>Created on</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{tableData}</Table.Tbody>
    </Table>
  );
}
