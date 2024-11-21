import { Box, Button, Card, Menu, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAccessToken } from '../../context/expensive';
import { useCurrencies } from '../../lib/hooks/useCurrencies';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../lib/hooks/useCategories';
import { useExpenses } from '../../lib/hooks/useExpenses';
import { CreateCurrencyModal } from '../../components/CreateCurrencyModal';
import { CreateExpenseModal } from '../../components/CreateExepenseModal';
import { CreateCategoryModal } from '../../components/CreateCategoryModal';
import { ExpensesTable } from '../../components/ExpensesTable';
import { CategoriesTable } from '../../components/CategoriesTable';
import { CurrenciesTable } from '../../components/CurrenciesTable';
import { IncomeTable } from '../../components/IncomeTable';
import { useIncome } from '../../lib/hooks/useIncome';
import { CreateIncomeModal } from '../../components/CreateIncomeModal';
import { useBalances } from '../../lib/hooks/useBalances';
import { BalancesOverview } from '../../components/BalancesOverview';

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

  const [
    openedCategoryModal,
    { open: openCategoryModal, close: closeCategoryModal },
  ] = useDisclosure(false);

  const [
    openedIncomeModal,
    { open: openIncomeModal, close: closeIncomeModal },
  ] = useDisclosure(false);


  const { setAccessToken } = useAccessToken();
  const { currenciesList, refresh: refreshCurrencies } = useCurrencies();
  const { categoriesList, refresh: refreshCategories } = useCategories();
  const { expensesList, refresh: refreshExpenses } = useExpenses();
  const { incomeList, refresh: refreshIncome } = useIncome();
  const { balances } = useBalances();

  const onCloseCurrencyModal = useCallback(() => {
    refreshCurrencies();
    closeCurrencyModal();
  }, [refreshCurrencies, closeCurrencyModal]);

  const onCloseExpenseModal = useCallback(() => {
    refreshExpenses();
    closeExpenseModal();
  }, [refreshExpenses, closeExpenseModal]);

  const onCloseCategoryModal = useCallback(() => {
    refreshCategories();
    closeCategoryModal();
  }, [refreshCategories, closeCategoryModal]);

  const onCloseIncomeModal = useCallback(() => {
    refreshIncome();
    closeIncomeModal();
  }, [refreshIncome, closeIncomeModal]);

  const logout = useCallback(() => {
    if (setAccessToken) {
      setAccessToken(null);
    }
    navigate('/');
  }, [setAccessToken]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/');
  }, []);

  return (
    <Box
      bg="var(--mantine-color-dark-6)"
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CreateCurrencyModal
        opened={openedCurrencyModal}
        close={onCloseCurrencyModal}
      />

      <CreateCategoryModal
        opened={openedCategoryModal}
        close={onCloseCategoryModal}
      />

      <CreateExpenseModal
        opened={openedExpenseModal}
        close={onCloseExpenseModal}
        currencies={currenciesList}
        categories={categoriesList}
      />

      <CreateIncomeModal
        opened={openedIncomeModal}
        close={onCloseIncomeModal}
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
            <Button onClick={logout} color="red.6">
              Logout
            </Button>

            <Menu shadow="md">
              <Menu.Target>
                <Button ml={5} color="orange.6">
                  Create
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={openCategoryModal}>Category</Menu.Item>
                <Menu.Item onClick={openCurrencyModal}>Currency</Menu.Item>
                <Menu.Item onClick={openExpenseModal}>Expense</Menu.Item>
                <Menu.Item onClick={openIncomeModal}>Income</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Box>

        <Card mt={5} shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
          <BalancesOverview balances={balances} />
        </Card>

        <Card mt={5} shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
          <Title order={3}>Your Currencies</Title>
          <CurrenciesTable currenciesList={currenciesList} />
        </Card>

        <Card mt={5} shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
          <Title order={3}>Your Categories</Title>
          <CategoriesTable categoriesList={categoriesList} />
        </Card>

        <Card mt={5} shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
          <Title order={3}>last expenses</Title>
          <ExpensesTable expensesList={expensesList} currencies={currenciesList} categories={categoriesList} />
        </Card>

        <Card mt={5} shadow="sm" padding="lg" radius="md" withBorder w={'100%'}>
          <Title order={3}>Recent Income</Title>
          <IncomeTable incomeList={incomeList} currencies={currenciesList} categories={categoriesList} />
        </Card>

      </Box>
    </Box>
  );
}

export default Home;
