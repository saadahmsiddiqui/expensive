import { useEffect, useState } from 'react';
import { useApi } from '../../context/expensiveApiContext';
import { Category } from '../expensive';

export function useCategories() {
  const [categoriesList, setCategoriesList] = useState<Array<Category>>([]);
  const { categories } = useApi();

  useEffect(() => {
    categories?.get().then(setCategoriesList);
  }, [categories]);

  return categoriesList;
}
