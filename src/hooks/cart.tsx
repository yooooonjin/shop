import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addToCart,
  changeCount,
  deleteCartItem,
  getCartByUser,
} from '../api/product';
import { queryClient } from '../App';
import { Product } from '../pages/AddProducts';

export type UpdateItem = CartItem & { uid: string };

export type CartItem = Omit<Product, 'options' | 'description'> & {
  option: string;
  count: number;
};

export default function useCart(uid: string) {
  const {
    data: items,
    isLoading,
    error,
  } = useQuery<CartItem[]>({
    queryKey: ['cart', uid],
    queryFn: async () => getCartByUser(uid),
  });

  const updateMutation = useMutation({
    mutationFn: addToCart,
    onMutate: async (item) => {
      const { uid, ...product } = item;
      await queryClient.cancelQueries({ queryKey: ['cart', uid] });
      const prev = queryClient.getQueryData<CartItem[]>(['cart', uid]) ?? [];
      queryClient.setQueryData<CartItem[]>(['cart', uid], [...prev, product]);

      return { prev };
    },
    onError: (err, variables, context: { prev: CartItem[] } | undefined) => {
      queryClient.setQueryData(['cart', uid], context?.prev);
    },
    onSuccess: () => {
      alert('해당 상품이 장바구니에 담겼습니다.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCartItem,
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: ['cart', uid] });
      const prev = queryClient.getQueryData<CartItem[]>(['cart', uid]) ?? [];
      queryClient.setQueryData<CartItem[]>(
        ['cart', uid],
        prev.filter((pre) => pre.id !== item.id && pre.option !== item.option)
      );

      return { prev };
    },
    onError: (err, variables, context: { prev: CartItem[] } | undefined) => {
      queryClient.setQueryData(['cart', uid], context?.prev);
    },
  });

  const changeMutation = useMutation({
    mutationFn: changeCount,
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: ['cart', uid] });
      const prev = queryClient.getQueryData<CartItem[]>(['cart', uid]) ?? [];
      queryClient.setQueryData<CartItem[]>(
        ['cart', uid],
        prev.map((pre) => {
          if (pre.id === item.id && pre.option === item.option) return item;
          else return pre;
        })
      );

      return { prev };
    },
    onError: (err, variables, context: { prev: CartItem[] } | undefined) => {
      queryClient.setQueryData(['cart', uid], context?.prev);
    },
  });

  const handleAddItem = (item: UpdateItem) => {
    updateMutation.mutate(item);
  };
  const handleDeleteItem = (item: UpdateItem) => {
    deleteMutation.mutate(item);
  };
  const handleChangeCount = (item: UpdateItem) => {
    changeMutation.mutate(item);
  };

  return {
    items,
    isLoading,
    error,
    addItem: handleAddItem,
    deleteItem: handleDeleteItem,
    changeCount: handleChangeCount,
  };
}
