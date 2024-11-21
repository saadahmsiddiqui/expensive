import { Table } from '@mantine/core';
import { Currency } from '../lib/expensive/currencies';

export function CurrenciesTable({
  currenciesList,
}: {
  currenciesList: Currency[];
}) {
  const tableData = currenciesList.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Symbol</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{tableData}</Table.Tbody>
    </Table>
  );
}
