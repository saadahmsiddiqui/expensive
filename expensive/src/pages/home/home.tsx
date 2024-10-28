import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Menu,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAccessToken, useApi } from '../../context/expensiveApiContext';
import { useCurrencies } from '../../lib/hooks/useCurrencies';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';

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
  const [opened, { open: openCreateCurrencyModal, close }] =
    useDisclosure(false);

  const { accessToken, setAccessToken } = useAccessToken();

  useEffect(() => {
    if (!accessToken) navigate('/');
  }, [accessToken]);

  const currenciesList = useCurrencies();

  const rows = currenciesList.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
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
      <CreateCurrencyModal opened={opened} close={close} />

      <Box
        style={{
          width: '50%',
          display: 'flex',
          marginTop: '10vh',
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
            <ActionIcon
              mr={5}
              variant="gradient"
              size="m"
              aria-label="Gradient action icon"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              onClick={() => {
                if (setAccessToken) {
                  setAccessToken(null);
                }
              }}
            >
              <IconLogout />
            </ActionIcon>
            <Menu shadow="md">
              <Menu.Target>
                <Button color="orange.6">Create</Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={openCreateCurrencyModal}>
                  Currency
                </Menu.Item>
                <Menu.Item>Expense</Menu.Item>
                <Menu.Item>Income</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Box>

        <Card shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
          <Title order={3}>Currencies</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Symbol</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Card>

        <Card
          mt={10}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          w={'100%'}
        >
          <Title order={3}>Expenses</Title>
        </Card>
      </Box>
    </Box>
  );
}

export default Home;
