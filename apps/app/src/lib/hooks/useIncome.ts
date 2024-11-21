import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../../context/expensive';
import { Income } from '../expensive/income';

export function useIncome() {
  const [incomeList, setIncomeList] = useState<Array<Income>>([]);
  const { income } = useApi();

  const refresh = useCallback(() => {
    income?.get().then(setIncomeList);
  }, [income]);

  useEffect(() => {
    income?.get().then(setIncomeList);
  }, [income]);

  return { incomeList, refresh };
}
