import { Table } from "@mantine/core";
import { Expense } from "../lib/expensive/expenses";
import { Currency } from "../lib/expensive/currencies";
import { useMemo } from "react";
import { Category } from "../lib/expensive";

export function ExpensesTable({
  expensesList,
  currencies,
  categories,
}: {
  expensesList: Expense[];
  currencies: Currency[];
  categories: Category[];
}) {
  if (expensesList.length === 0) {
    return <h3>No Records Added</h3>;
  }

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

  const tableData = expensesList.map((expense) => (
    <Table.Tr key={expense.id}>
      <Table.Td>{categoriesMap.get(expense.categoryId)}</Table.Td>
      <Table.Td>{expense.amount}</Table.Td>
      <Table.Td>{currenciesMap.get(expense.currencyId)}</Table.Td>
      <Table.Td>{new Date(expense.createdOn).toDateString()}</Table.Td>
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
