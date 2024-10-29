import { Table } from '@mantine/core';
import { Expense } from '../lib/expensive/expenses';

export function ExpensesTable({ expensesList }: { expensesList: Expense[] }) {
  const tableData = expensesList.map((expense) => (
    <Table.Tr key={expense.id}>
      <Table.Td>{expense.categoryId}</Table.Td>
      <Table.Td>{expense.amount}</Table.Td>
      <Table.Td>{expense.currencyId}</Table.Td>
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
