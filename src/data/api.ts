/**
 * Simulated API calls with network delays
 * All functions return promises with 2000ms delay to imitate network calls
 */

import { PRODUCTS } from './products';
import { store } from '../store/store';

const NETWORK_DELAY = 2000; // 2 seconds

/**
 * Simulates fetching products from the server
 */
export const fetchProducts = (): Promise<typeof PRODUCTS> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS);
    }, NETWORK_DELAY);
  });
};

/**
 * Simulates fetching product details from the server by product ID
 */
export const fetchProductDetails = (productId: string): Promise<typeof PRODUCTS.products[0] | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Dynamically gather all products from all keys in PRODUCTS object
      const allProducts = Object.values(PRODUCTS).flat();
      const product = allProducts.find(p => p.id === productId);
      resolve(product || null);
    }, NETWORK_DELAY);
  });
};

/**
 * Simulates fetching cart data from the server
 * Returns the current Redux cart state
 */
export const fetchCart = (): Promise<ReturnType<typeof store.getState>['cart']> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cartState = store.getState().cart;
      resolve(cartState);
    }, NETWORK_DELAY);
  });
};

/**
 * Simulates fetching order details from the server
 */
export const fetchOrderDetails = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, NETWORK_DELAY);
  });
};

/**
 * Simulates placing an order
 */
export const placeOrder = (cardNumber: string): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate failure for card ending in 3456
      const success = cardNumber !== "3456";
      resolve({ success });
    }, NETWORK_DELAY);
  });
};

/**
 * Simulates processing payment
 */
export interface ProcessPaymentPayload {
  cardNumber: string;
  amount: number;
  paymentMethodId: string;
}

export const processPayment = (payload: ProcessPaymentPayload): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate failure for card ending in 3456
      const success = payload.cardNumber !== "3456";
      resolve({ success });
    }, NETWORK_DELAY);
  });
};

/**
 * Payment method interface
 */
export interface PaymentMethod {
  id: string;
  cardNumber: string;
  cardIcon: string;
  cardType: string;
}

/**
 * Simulates fetching payment methods from the server
 */
export const fetchPaymentMethods = (): Promise<PaymentMethod[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const paymentMethods: PaymentMethod[] = [
        {
          id: '1',
          cardNumber: '7891',
          cardIcon: 'card-outline',
          cardType: 'Visa',
        },
        {
          id: '2',
          cardNumber: '3456',
          cardIcon: 'card-outline',
          cardType: 'Mastercard',
        },
      ];
      resolve(paymentMethods);
    }, NETWORK_DELAY);
  });
};

/**
 * Simulates searching products
 */
export const searchProducts = (_query: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, NETWORK_DELAY);
  });
};

/**
 * Simulates adding item to cart on server
 */
export const addToCartAPI = (_productId: string, _quantity: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, NETWORK_DELAY);
  });
};

/**
 * Simulates removing item from cart on server
 */
export const removeFromCartAPI = (_productId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, NETWORK_DELAY);
  });
};

/**
 * Generic network call simulator
 */
export const simulateNetworkCall = <T = void>(data?: T): Promise<T extends void ? void : T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data as any);
    }, NETWORK_DELAY);
  }) as Promise<T extends void ? void : T>;
};
