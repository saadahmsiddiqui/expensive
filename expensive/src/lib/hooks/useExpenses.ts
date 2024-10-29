import { useCallback, useEffect } from 'react';
import { useApi, useExpensiveState } from '../../context/expensive';

export function useExpenses() {
  const { expenseList: expensesList, setExpenseList } = useExpensiveState();
  const { expenses } = useApi();

  const refresh = useCallback(() => {
    expenses?.get().then(setExpenseList);
  }, [expenses, setExpenseList]);

  useEffect(() => {
    expenses?.get().then(setExpenseList);
  }, [expenses]);

  return { expensesList, refresh };
}
