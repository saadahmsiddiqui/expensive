import { useEffect, useState } from 'react';
import { useApi } from '../../context/expensiveApiContext';
import { Currency } from '../expensive/currencies';

export function useCurrencies() {
  const [currenciesList, setCurrenciesList] = useState<Array<Currency>>([]);
  const { currencies } = useApi();

  useEffect(() => {
    currencies?.get().then(setCurrenciesList);
  }, [currencies]);

  return currenciesList;
}
