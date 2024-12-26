import { Table } from "@mantine/core";
import { Category } from "../lib/expensive";

export function CategoriesTable({
  categoriesList,
}: {
  categoriesList: Category[];
}) {
  if (categoriesList.length === 0) {
    return <h3>No Records Added</h3>;
  }

  const tableData = categoriesList.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{tableData}</Table.Tbody>
    </Table>
  );
}
