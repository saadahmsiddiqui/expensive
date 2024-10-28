import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Menu,
  NumberInput,
  Select,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAccessToken, useApi } from '../../context/expensiveApiContext';
import { useCurrencies } from '../../lib/hooks/useCurrencies';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../lib/hooks/useCategories';
import { useExpenses } from '../../lib/hooks/useExpenses';
import { Currency } from '../../lib/expensive/currencies';
import { Category } from '../../lib/expensive';

function CreateExpenseModal({
  opened,
  currencies,
  categories,
  close,
}: {
  opened: boolean;
  close: () => void;
  currencies: Currency[];
  categories: Category[];
}) {
  const { expenses } = useApi();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      amount: 0,
      category: '',
      currency: '',
      note: '',
    },

    validate: {
      amount: (value) => value === 0,
      category: (value) => !categories.map((c) => c.name).includes(value),
      currency: (value) => !currencies.map((c) => c.name).includes(value),
      note: (value) => false,
    },
  });

  const onSubmit = (
    amount: number,
    note: string,
    currency: string,
    category: string
  ) => {
    const currencyId = currencies.find((c) => c.name === currency)?.id;
    const categoryId = categories.find((c) => c.name === category)?.id;

    expenses
      ?.create(amount, note, currencyId!, categoryId!)
      .then(console.log)
      .catch(console.log)
      .finally(close);
  };

  return (
    <Modal
      bg="var(--mantine-color-dark-6)"
      opened={opened}
      onClose={close}
      title="Create Currency"
    >
      <form
        onSubmit={form.onSubmit(({ category, currency, amount, note }) =>
          onSubmit(amount, note, currency, category)
        )}
      >
        <Select
          label="Currency"
          placeholder="Select currency"
          data={currencies.map((c) => c.name)}
          value={form.getValues().currency}
          onChange={(_value, option) => {
            if (_value) form.setValues({ currency: _value });
          }}
        />

        <Select
          label="Category"
          placeholder="Select category"
          data={categories.map((c) => c.name)}
          value={form.getValues().category}
          onChange={(_value, option) => {
            if (_value) form.setValues({ category: _value });
          }}
        />

        <NumberInput
          label="Amount"
          description="Enter amount"
          value={form.getValues().amount}
          placeholder="e.g 1.23"
          {...form.getInputProps('amount')}
        />

        <TextInput
          key={form.key('note')}
          label="Note"
          placeholder="e.g Payment for dinner"
          {...form.getInputProps('note')}
        ></TextInput>

        <Button color="orange.6" type="submit" mt={10} w={'100%'}>
          Create
        </Button>
      </form>
    </Modal>
  );
}

function CreateCurrencyModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { currencies } = useApi();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      symbol: '',
    },

    validate: {
      name: (value) => value.length <= 0,
      symbol: (value) => value.length <= 0 || value.match(/a-z/),
    },
  });

  const onSubmit = (name: string, symbol: string) => {
    currencies!
      .create(name, symbol)
      .then((response) => {
        console.log(response);
        form.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => close());
  };

  return (
    <Modal
      bg="var(--mantine-color-dark-6)"
      opened={opened}
      onClose={close}
      title="Create Currency"
    >
      <form
        onSubmit={form.onSubmit(({ name, symbol }) => onSubmit(name, symbol))}
      >
        <TextInput
          key={form.key('name')}
          label="Currency name"
          placeholder="Ethereum"
          {...form.getInputProps('name')}
        />
        <TextInput
          key={form.key('symbol')}
          label="Symbol"
          placeholder="ETH"
          {...form.getInputProps('symbol')}
        ></TextInput>

        <Button color="orange.6" type="submit" mt={10} w={'100%'}>
          Create
        </Button>
      </form>
    </Modal>
  );
}

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

  const { accessToken, setAccessToken } = useAccessToken();

  useEffect(() => {
    if (!accessToken) navigate('/');
  }, [accessToken]);

  const currenciesList = useCurrencies();
  const categoriesList = useCategories();
  const expensesList = useExpenses();

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
                  setAccessToken(null);
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
