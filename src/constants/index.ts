/**
 * Application Constants
 * Centralized constants for colors, screens, labels, icons, and other app-wide values
 */

// ============================================================================
// COLORS
// ============================================================================
export const COLORS = {
  // Primary Colors
  BLACK: '#000',
  WHITE: '#fff',
  
  // Grays
  GRAY_DARK: '#333',
  GRAY_MEDIUM: '#666',
  GRAY_LIGHT: '#ccc',
  GRAY_LIGHTER: '#e0e0e0',
  GRAY_LIGHTEST: '#f0f0f0',
  
  // Background Colors
  BACKGROUND_PRIMARY: '#fff',
  BACKGROUND_SECONDARY: '#f7f7f8',
  BACKGROUND_TERTIARY: '#f5f5f5',
  BACKGROUND_GRAY: '#f2f2f2',
  BACKGROUND_LIGHT_GRAY: '#f9f9f9',
  
  // Border Colors
  BORDER_LIGHT: '#eee',
  BORDER_MEDIUM: '#e5e5e5',
  BORDER_DARK: '#000',
  
  // Text Colors
  TEXT_PRIMARY: '#000',
  TEXT_SECONDARY: '#111',
  TEXT_TERTIARY: '#444',
  TEXT_LIGHT: '#666',
  TEXT_LIGHTER: '#999',
  
  // Accent Colors
  YELLOW: '#FFD700',
  WARNING_BG: '#fff3cd',
  WARNING_BORDER: '#ffc107',
  WARNING_TEXT: '#856404',
  
  // Functional Colors
  SUCCESS: '#000',
  SUCCESS_BG: '#e8f9ee',
  SUCCESS_TEXT: '#16a34a',
  ERROR: '#000',
  DISABLED: '#ccc',
  
  // Shadow
  SHADOW: '#000',
} as const;

// ============================================================================
// SCREENS
// ============================================================================
export const SCREENS = {
  HOME: 'Home',
  CART: 'Cart',
  CART_REVIEW: 'CartReview',
  PRODUCT_DETAILS: 'ProductDetails',
  SEARCH: 'Search',
  CONFIRMATION: 'Confirmation',
  PAYMENT_PROCESSING: 'PaymentProcessing',
} as const;

// ============================================================================
// LABELS
// ============================================================================
export const LABELS = {
  // Buttons
  ADD_TO_CART: 'Add to Cart',
  ADD: 'Add',
  VIEW_CART: 'View Cart',
  PLACE_ORDER: 'Place Order',
  PAY_AND_PLACE_ORDER: 'Pay & Place Order',
  BACK_TO_HOME: 'Back to Home',
  CONTINUE_SHOPPING: 'Continue Shopping',
  
  // Headers
  YOUR_CART: 'Your Cart',
  REVIEW_ORDER: 'Review Order',
  PROCESSING_PAYMENT: 'Processing Payment...',
  ORDER_CONFIRMED: 'Order Confirmed!',
  PAYMENT_FAILED: 'Payment Failed',
  
  // Sections
  PAYMENT_METHOD: 'Payment Method',
  ORDER_ITEMS: 'Order Items',
  ORDER_SUMMARY: 'Order Summary',
  RATING: 'Rating',
  FEATURES: 'Features',
  TAGS: 'Tags',
  DESCRIPTION: 'Description',
  LOADING: 'Loading...',
  FOR_YOU: 'For You',
  RECENT_SEARCHES: 'Recent Searches',
  SEARCH_RESULTS: 'Search Results',
  CLEAR: 'Clear',
  SEARCHING: 'Searching...',
  NO_PRODUCTS_FOUND: 'No products found for',
  FEATURED: 'Featured',
  THINGS_YOU_MIGHT_LIKE: 'Things you might like',
  NEW_ARRIVALS: 'New Arrivals',
  
  // App Name
  APP_NAME: 'Noon',
  
  // Cart
  ITEMS: 'items',
  EMPTY_CART: 'Your cart is empty',
  REMOVE: 'Remove',
  DECREMENT: '–',
  INCREMENT: '+',
  
  // Pricing
  SUBTOTAL: 'Subtotal',
  DELIVERY_FEE: 'Delivery Fee',
  TAX: 'Tax (18% GST)',
  TOTAL: 'Total',
  
  // Delivery
  DELIVERY_IN: 'Delivery in',
  MINUTES: 'minutes',
  
  // Messages
  SELECT_PAYMENT_CARD: '⚠️ Please select a payment card to continue',
  PAYMENT_SUCCESSFUL: 'Your order has been placed successfully!',
  PAYMENT_FAILED_MESSAGE: 'Payment failed. Try again.',
  
  // Card Numbers
  CARD_ENDING: 'Card ending ••••',
} as const;

// ============================================================================
// ICONS
// ============================================================================
export const ICONS = {
  // Ionicons
  CHEVRON_BACK: 'chevron-back-sharp',
  CART_OUTLINE: 'cart-outline',
  CART: 'cart',
  FLASH: 'flash-sharp',
  
  // Emoji/Unicode
  STAR: '⭐',
  ROCKET: '🚀',
  WARNING: '⚠️',
  CHECKMARK: '✓',
  
  // Bullet
  BULLET: '•',
} as const;

// ============================================================================
// DIMENSIONS
// ============================================================================
export const DIMENSIONS = {
  // Padding
  PADDING_SMALL: 8,
  PADDING_MEDIUM: 12,
  PADDING_LARGE: 16,
  PADDING_XLARGE: 20,
  
  // Border Radius
  RADIUS_SMALL: 6,
  RADIUS_MEDIUM: 8,
  RADIUS_LARGE: 10,
  RADIUS_XLARGE: 20,
  
  // Border Width
  BORDER_THIN: 1,
  BORDER_MEDIUM: 1.5,
  BORDER_THICK: 2,
  BORDER_ACCENT: 4,
  
  // Elevation
  ELEVATION_LOW: 2,
  ELEVATION_MEDIUM: 3,
  ELEVATION_HIGH: 10,
  ELEVATION_HIGHEST: 12,
} as const;

// ============================================================================
// FONT WEIGHTS
// ============================================================================
export const FONT_WEIGHTS = {
  NORMAL: '400',
  MEDIUM: '500',
  SEMIBOLD: '600',
  BOLD: '700',
  EXTRABOLD: '800',
} as const;

// ============================================================================
// FONT SIZES
// ============================================================================
export const FONT_SIZES = {
  XSMALL: 12,
  SMALL: 13,
  MEDIUM: 14,
  REGULAR: 15,
  LARGE: 16,
  XLARGE: 18,
  XXLARGE: 20,
  XXXLARGE: 22,
} as const;

// ============================================================================
// TIMING
// ============================================================================
export const TIMING = {
  SHIMMER_DELAY: 2000,
  PAYMENT_PROCESSING: 3000,
  NETWORK_DELAY: 2000,
  ANIMATION_DURATION: 300,
} as const;

// ============================================================================
// DELIVERY
// ============================================================================
export const DELIVERY = {
  MIN_MINUTES: 8,
  MAX_MINUTES: 15,
  FEE: 40,
} as const;

// ============================================================================
// TAX
// ============================================================================
export const TAX = {
  GST_RATE: 0.18,
  GST_LABEL: '18% GST',
} as const;

// ============================================================================
// CARD NUMBERS
// ============================================================================
export const CARD_NUMBERS = {
  SUCCESS: '7891',
  FAILURE: '3456',
} as const;

// ============================================================================
// OPACITY
// ============================================================================
export const OPACITY = {
  DISABLED: 0.3,
  MEDIUM: 0.5,
  SHADOW_LOW: 0.06,
  SHADOW_MEDIUM: 0.1,
  SHADOW_HIGH: 0.15,
  SHADOW_HIGHEST: 0.2,
} as const;

// ============================================================================
// SHADOW
// ============================================================================
export const SHADOW = {
  OFFSET_SMALL: { width: 0, height: 1 },
  OFFSET_MEDIUM: { width: 0, height: 2 },
  OFFSET_LARGE: { width: 0, height: -2 },
  OFFSET_XLARGE: { width: 0, height: -3 },
  RADIUS_SMALL: 3,
  RADIUS_MEDIUM: 5,
  RADIUS_LARGE: 8,
} as const;

// ============================================================================
// ANIMATION
// ============================================================================
export const ANIMATION = {
  CONTAINER_SIZE: 250,
  LOTTIE_SIZE: 250,
  TEXT_MARGIN_TOP: 20,
} as const;

// ============================================================================
// SPACING
// ============================================================================
export const SPACING = {
  MARGIN_BOTTOM_SMALL: 20,
} as const;
