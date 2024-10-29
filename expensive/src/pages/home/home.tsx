import { Box, Button, Card, Menu, Table, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAccessToken } from '../../context/expensiveApiContext';
import { useCurrencies } from '../../lib/hooks/useCurrencies';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../lib/hooks/useCategories';
import { useExpenses } from '../../lib/hooks/useExpenses';
import { CreateCurrencyModal } from '../../components/CreateCurrencyModal';
import { CreateExpenseModal } from '../../components/CreateExepenseModal';

export function Home() {
  const navigate = useNavigate();

  const [
    openedCurrencyModal,
    { open: openCurrencyModal, close: closeCurrencyModal },
  ] = useDisclosure(false);

  const [
    openedExpenseModal,
    { open: openExpenseModal, close: closeExpenseModal },
  ] = useDisclosure(false);

  const { setAccessToken } = useAccessToken();

  const currenciesList = useCurrencies();
  const categoriesList = useCategories();
  const expensesList = useExpenses();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/');
  }, []);

  const currencySymbolsMap = useMemo(() => {
    return currenciesList.reduce((agg, curr) => {
      agg.set(curr.id, curr.symbol);
      return agg;
    }, new Map<string, string>());
  }, [currenciesList]);

  const categoriesMap = useMemo(() => {
    return categoriesList.reduce((agg, curr) => {
      agg.set(curr.id, curr.name);
      return agg;
    }, new Map<string, string>());
  }, [categoriesList]);

  const currencies = currenciesList.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
    </Table.Tr>
  ));

  const categories = categoriesList.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
    </Table.Tr>
  ));

  const expenses = expensesList.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{categoriesMap.get(element.categoryId) ?? '-'}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{currencySymbolsMap.get(element.currencyId) ?? '-'}</Table.Td>
      <Table.Td>{new Date(element.createdOn).toDateString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Box
      bg="var(--mantine-color-dark-6)"
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CreateCurrencyModal
        opened={openedCurrencyModal}
        close={closeCurrencyModal}
      />

      <CreateExpenseModal
        opened={openedExpenseModal}
        close={closeExpenseModal}
        currencies={currenciesList}
        categories={categoriesList}
      />

      <Box
        style={{
          width: '50%',
          display: 'flex',
          marginTop: '1vh',
          flexWrap: 'wrap',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Title style={{ color: '#fff' }} order={3}>
            Expensive
          </Title>

          <Box>
            <Button
              onClick={() => {
                if (setAccessToken) {
                  localStorage.removeItem('accessToken');
                  setAccessToken(null);
                  navigate('/');
                }
              }}
              color="red.6"
            >
              Logout
            </Button>

            <Menu shadow="md">
              <Menu.Target>
                <Button ml={5} color="orange.6">
                  Create
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={openCurrencyModal}>Currency</Menu.Item>
                <Menu.Item onClick={openExpenseModal}>Expense</Menu.Item>
                <Menu.Item>Income</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Box>

        <Card shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
          <Title order={3}>Your Currencies</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Symbol</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{currencies}</Table.Tbody>
          </Table>
        </Card>

        <Card mt={5} shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
          <Title order={3}>Your Categories</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{categories}</Table.Tbody>
          </Table>
        </Card>

        <Card mt={5} shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
          <Title order={3}>Last Expenses</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Currency</Table.Th>
                <Table.Th>Created on</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{expenses}</Table.Tbody>
          </Table>
        </Card>
      </Box>
    </Box>
  );
}

export default Home;
