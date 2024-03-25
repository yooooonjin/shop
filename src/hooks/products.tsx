import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getProductsByCategory } from '../api/product';

export function useProducts(category: string = '') {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      if (!category) return getAllProducts();
      else return getProductsByCategory(category);
    },
    staleTime: 1000 * 60 * 3,
  });

  return { products, isLoading, error };
}
