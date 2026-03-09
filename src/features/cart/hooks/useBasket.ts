import { Cart } from '@/features/basket/types/cart.model';
import { deleteCart, fetchCart } from '@/features/basket/api/carts.api';
import { useEffect, useState } from 'react';

export const useBasket = () => {
  const [baskets, setBaskets] = useState<Cart[]>([]);

  const deleteCartItem = (id: number) => {
    deleteCart(id).then(() => {
      setBaskets((prev) => prev.filter((basket) => basket.cart_id !== id));
    });
  };

  useEffect(() => {
    fetchCart().then((baskets) => {
      setBaskets(baskets);
    });
  }, []);

  return { baskets, isEmpty: baskets.length === 0, deleteCartItem };
};
