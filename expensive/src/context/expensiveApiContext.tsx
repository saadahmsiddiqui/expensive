import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Auth, Categories } from '../lib/expensive';
import { Currencies } from '../lib/expensive/currencies';
import { Expenses } from '../lib/expensive/expenses';

const ExpensiveApiContext = React.createContext<{
  accessToken: string | null;
  setAccessToken?: (value: string | null) => void;
  auth?: Auth;
  expenses: Expenses | null;
  currencies: Currencies | null;
  categories: Categories | null;
}>({
  accessToken: null,
  setAccessToken: undefined,
  auth: undefined,
  expenses: null,
  currencies: null,
  categories: null,
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
  const [clients, setClients] = useState<{
    categories: null | Categories;
    currencies: null | Currencies;
    expenses: null | Expenses;
  }>({
    categories: null,
    currencies: null,
    expenses: null,
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
      });
    } else {
      setClients({ categories: null, currencies: null, expenses: null });
    }
  }, [accessToken]);

  const { expenses, categories, currencies } = clients;

  return (
    <ExpensiveApiContext.Provider
      value={{
        accessToken,
        setAccessToken,
        auth,
        expenses,
        categories,
        currencies,
      }}
    >
      {children}
    </ExpensiveApiContext.Provider>
  );
}

export function useApi() {
  const { expenses, categories, auth, currencies } =
    useContext(ExpensiveApiContext);

  return {
    expenses,
    categories,
    auth,
    currencies,
  };
}

export function useAccessToken() {
  const { accessToken, setAccessToken } = useContext(ExpensiveApiContext);

  return {
    accessToken,
    setAccessToken,
  };
}
