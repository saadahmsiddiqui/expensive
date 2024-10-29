import { useCallback, useEffect, useState } from 'react';
import { useApi, useExpensiveState } from '../../context/expensive';
import { Currency } from '../expensive/currencies';

export function useCurrencies() {
  const { currencyList: currenciesList, setCurrencyList } = useExpensiveState();
  const { currencies } = useApi();

  const refresh = useCallback(() => {
    currencies?.get().then(setCurrencyList);
  }, [currencies, setCurrencyList]);

  useEffect(() => {
    refresh();
  }, [currencies]);

  return { currenciesList, refresh };
}
