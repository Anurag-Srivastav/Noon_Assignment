/**
 * Domain Layer
 * Business logic layer that sits between UI components and API calls
 * Components should call domain functions instead of calling API directly
 */

import { fetchProducts, fetchProductDetails, fetchCart, placeOrder, processPayment, fetchPaymentMethods, PaymentMethod, ProcessPaymentPayload } from '../data/api';
import type { Product } from '../data/products';
import type { CartItem } from '../store/cart/cartSlice';
import { DELIVERY, TAX } from '../constants';

// ============================================================================
// PRODUCT DOMAIN
// ============================================================================

/**
 * Get all products (featured and forYou)
 */
export const getAllProducts = async (): Promise<{
  products: Product[];
  forYou: Product[];
}> => {
  try {
    const data = await fetchProducts();
    return {
      products: data.products,
      forYou: data.forYou,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to load products');
  }
};

/**
 * Get product details by ID
 */
export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const product = await fetchProductDetails(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw new Error('Failed to load product details');
  }
};

/**
 * Search products by query
 */
export const searchProducts = async (
  query: string,
  allProducts: Product[]
): Promise<Product[]> => {
  try {
    if (!query.trim()) {
      return [];
    }
    
    const normalizedQuery = query.toLowerCase();
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description?.toLowerCase().includes(normalizedQuery) ||
      product.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products');
  }
};

// ============================================================================
// CART DOMAIN
// ============================================================================

/**
 * Get cart data
 */
export const getCartData = async (): Promise<{
  items: CartItem[];
  total: number;
}> => {
  try {
    const cartState = await fetchCart();
    return {
      items: cartState.items,
      total: cartState.total,
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Failed to load cart');
  }
};

/**
 * Calculate cart totals
 */
export const calculateCartTotals = (items: CartItem[]): {
  subtotal: number;
  itemCount: number;
} => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { subtotal, itemCount };
};

/**
 * Validate cart before checkout
 */
export const validateCart = (items: CartItem[]): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (items.length === 0) {
    errors.push('Cart is empty');
  }
  
  items.forEach(item => {
    if (item.quantity <= 0) {
      errors.push(`Invalid quantity for ${item.product.name}`);
    }
    if (item.product.price <= 0) {
      errors.push(`Invalid price for ${item.product.name}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// ============================================================================
// ORDER DOMAIN
// ============================================================================

export interface OrderSummary {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

/**
 * Calculate order summary
 */
export const calculateOrderSummary = (items: CartItem[]): OrderSummary => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const deliveryFee = DELIVERY.FEE;
  const tax = Math.round(subtotal * TAX.GST_RATE);
  const total = subtotal + deliveryFee + tax;
  
  return {
    subtotal,
    deliveryFee,
    tax,
    total,
  };
};

/**
 * Place an order with payment
 */
export const submitOrder = async (cardNumber: string): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const orderResult = await placeOrder(cardNumber);
    
    if (!orderResult.success) {
      return {
        success: false,
        message: 'Payment failed. Please try again.',
      };
    }
    
    return {
      success: true,
      message: 'Order placed successfully!',
    };
  } catch (error) {
    console.error('Error placing order:', error);
    return {
      success: false,
      message: 'Failed to place order. Please try again.',
    };
  }
};

/**
 * Process payment with full payload
 */
export const processPaymentRequest = async (
  cardNumber: string,
  amount: number,
  paymentMethodId: string
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const payload: ProcessPaymentPayload = {
      cardNumber,
      amount,
      paymentMethodId,
    };
    
    const result = await processPayment(payload);
    
    if (!result.success) {
      return {
        success: false,
        message: 'We are unable to place your order due to unsuccessful payment. Please try again.',
      };
    }
    
    return {
      success: true,
      message: 'Payment processed successfully!',
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      success: false,
      message: 'Payment processing failed. Please try again.',
    };
  }
};

/**
 * Validate payment card
 */
export const validatePaymentCard = (cardNumber: string | null): {
  isValid: boolean;
  error?: string;
} => {
  if (!cardNumber) {
    return {
      isValid: false,
      error: 'Please select a payment card',
    };
  }
  
  if (cardNumber.length !== 4) {
    return {
      isValid: false,
      error: 'Invalid card number',
    };
  }
  
  return { isValid: true };
};

/**
 * Get available payment methods
 */
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  try {
    const paymentMethods = await fetchPaymentMethods();
    return paymentMethods;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw new Error('Failed to load payment methods');
  }
};

// Export PaymentMethod type for use in components
export type { PaymentMethod } from '../data/api';

