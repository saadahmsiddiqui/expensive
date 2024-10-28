import { useEffect, useState } from 'react';
import { useApi } from '../../context/expensiveApiContext';
import { Expense } from '../expensive/expenses';

export function useExpenses() {
  const [expensesList, setExpensesList] = useState<Array<Expense>>([]);
  const { expenses } = useApi();

  useEffect(() => {
    expenses?.get().then(setExpensesList);
  }, [expenses]);

  return expensesList;
}
