import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Auth, Categories, Category } from '../lib/expensive';
import { Currencies, Currency } from '../lib/expensive/currencies';
import { Expense, Expenses } from '../lib/expensive/expenses';
import { Income } from '../lib/expensive/income';
import { Balance, CurrencyBalance } from '../lib/expensive/balance';

const ExpensiveApiContext = React.createContext<{
  setAccessToken?: (value: string | null) => void;
  setExpenseList?: (list: Array<Expense>) => void;
  setCategoryList?: (list: Array<Category>) => void;
  setCurrencyList?: (list: Array<Currency>) => void;
  setBalances?: (list: Array<CurrencyBalance>) => void;
  balances: Array<CurrencyBalance>;
  accessToken: string | null;
  expenseList: Expense[];
  categoryList: Category[];
  currencyList: Currency[];
  auth?: Auth;
  balance: Balance | null;
  expenses: Expenses | null;
  currencies: Currencies | null;
  categories: Categories | null;
  income: Income | null;
}>({
  accessToken: null,
  balances: [],
  setAccessToken: undefined,
  auth: undefined,
  expenses: null,
  currencies: null,
  categories: null,
  income: null,
  balance: null,
  expenseList: [],
  currencyList: [],
  categoryList: [],
});

export function ExpensiveApiProvider({
  children,
  baseUrl,
}: {
  baseUrl: string;
  children: ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [auth, _] = useState(new Auth(baseUrl));
  const [expenseList, setExpenseList] = useState<Array<Expense>>([]);
  const [categoryList, setCategoryList] = useState<Array<Category>>([]);
  const [currencyList, setCurrencyList] = useState<Array<Currency>>([]);
  const [balances, setBalances] = useState<Array<CurrencyBalance>>([]);
  const [clients, setClients] = useState<{
    categories: null | Categories;
    currencies: null | Currencies;
    expenses: null | Expenses;
    balance: Balance | null;
    income: Income | null;
  }>({
    categories: null,
    currencies: null,
    expenses: null,
    balance: null,
    income: null,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) setAccessToken(accessToken);
  }, []);

  useEffect(() => {
    if (accessToken) {
      setClients({
        categories: new Categories(baseUrl, accessToken),
        currencies: new Currencies(baseUrl, accessToken),
        expenses: new Expenses(baseUrl, accessToken),
        income: new Income(baseUrl, accessToken),
        balance: new Balance(baseUrl, accessToken)
      });
    } else {
      setClients({
        categories: null,
        currencies: null,
        expenses: null,
        income: null,
        balance: null
      });
    }
  }, [accessToken]);

  const { expenses, categories, currencies, income, balance } = clients;

  return (
    <ExpensiveApiContext.Provider
      value={{
        balances,
        setBalances,
        balance,
        currencyList,
        setCurrencyList,
        categoryList,
        setCategoryList,
        setExpenseList,
        expenseList,
        accessToken,
        setAccessToken,
        auth,
        expenses,
        categories,
        currencies,
        income,
      }}
    >
      {children}
    </ExpensiveApiContext.Provider>
  );
}

export function useApi() {
  const { income, expenses, categories, auth, currencies, balance } =
    useContext(ExpensiveApiContext);

  return {
    balance,
    income,
    expenses,
    categories,
    auth,
    currencies,
  };
}

export function useExpensiveState() {
  const {
    setCategoryList,
    setCurrencyList,
    setExpenseList,
    categoryList,
    expenseList,
    currencyList,
    balances,
    setBalances
  } = useContext(ExpensiveApiContext);

  return {
    setBalances,
    balances,
    categoryList,
    expenseList,
    currencyList,
    setCategoryList,
    setCurrencyList,
    setExpenseList,
  };
}

export function useAccessToken() {
  const { accessToken, setAccessToken } = useContext(ExpensiveApiContext);

  return {
    accessToken,
    setAccessToken,
  };
}
