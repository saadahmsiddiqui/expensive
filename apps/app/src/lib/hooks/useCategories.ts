import { useCallback, useEffect } from 'react';
import { useApi, useExpensiveState } from '../../context/expensive';

export function useCategories() {
  const { categoryList: categoriesList, setCategoryList } = useExpensiveState();
  const { categories } = useApi();

  const refresh = useCallback(() => {
    categories?.get().then(setCategoryList);
  }, [categories, setCategoryList]);

  useEffect(() => {
    refresh();
  }, [categories]);

  return { categoriesList, refresh };
}
