import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Auth, Categories, Category } from '../lib/expensive';
import { Currencies, Currency } from '../lib/expensive/currencies';
import { Expense, Expenses } from '../lib/expensive/expenses';
import { Income } from '../lib/expensive/income';

const ExpensiveApiContext = React.createContext<{
  setAccessToken?: (value: string | null) => void;
  setExpenseList?: (list: Array<Expense>) => void;
  setCategoryList?: (list: Array<Category>) => void;
  setCurrencyList?: (list: Array<Currency>) => void;
  accessToken: string | null;
  expenseList: Expense[];
  categoryList: Category[];
  currencyList: Currency[];
  auth?: Auth;
  expenses: Expenses | null;
  currencies: Currencies | null;
  categories: Categories | null;
  income: Income | null;
}>({
  accessToken: null,
  setAccessToken: undefined,
  auth: undefined,
  expenses: null,
  currencies: null,
  categories: null,
  income: null,
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
  const [clients, setClients] = useState<{
    categories: null | Categories;
    currencies: null | Currencies;
    expenses: null | Expenses;
    income: Income | null;
  }>({
    categories: null,
    currencies: null,
    expenses: null,
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
      });
    } else {
      setClients({
        categories: null,
        currencies: null,
        expenses: null,
        income: null,
      });
    }
  }, [accessToken]);

  const { expenses, categories, currencies, income } = clients;

  return (
    <ExpensiveApiContext.Provider
      value={{
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
  const { income, expenses, categories, auth, currencies } =
    useContext(ExpensiveApiContext);

  return {
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
  } = useContext(ExpensiveApiContext);

  return {
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
