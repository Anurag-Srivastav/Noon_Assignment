import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addItem, removeItem, decrementItem } from "../store/cart/cartSlice";
import { Product } from "../data/products";
import { useCallback } from "react";

/**
 * Custom hook to manage cart item state and operations
 * @param product - The product to manage in the cart (optional for global cart data)
 * @returns Object containing cart state and operations
 */
export const useCartItem = (product?: Product) => {
  const dispatch = useDispatch();
  
  const cartItem = useSelector((state: RootState) =>
    product ? state.cart.items.find((item) => item.product.id === product.id) : null
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalAmount = useSelector((state: RootState) => state.cart.total);
  
  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Add item to cart (or increment if already exists)
  const addToCart = useCallback(() => {
    if (product) {
      dispatch(addItem(product));
    }
  }, [dispatch, product]);

  // Remove item completely from cart
  const removeFromCart = useCallback(() => {
    if (product) {
      dispatch(removeItem(product.id));
    }
  }, [dispatch, product]);

  // Increment quantity by 1
  const increment = useCallback(() => {
    if (product) {
      dispatch(addItem(product));
    }
  }, [dispatch, product]);

  // Decrement quantity by 1 (removes if quantity would be 0)
  const decrement = useCallback(() => {
    if (product) {
      dispatch(decrementItem(product.id));
    }
  }, [dispatch, product]);

  return {
    // State
    isInCart: !!cartItem,
    quantity: cartItem?.quantity ?? 0,
    totalAmount,
    totalItems,
    cartItem,
    cartItems,
    
    // Actions
    addToCart,
    removeFromCart,
    increment,
    decrement,
  };
};
