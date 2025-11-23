
/**
 * Shimmer Loader Constants
 * Centralized dimensions and spacing for shimmer loading components
 */

import { vh, vw } from "../utils/dimensions";


// Shimmer component dimensions
export const SHIMMER_DIMENSIONS = {
  HEIGHT_SM: vh(14),
  HEIGHT_MD: vh(16),
  HEIGHT_LG: vh(18),
  HEIGHT_BUTTON: vh(30),
  HEIGHT_LARGE_BUTTON: vh(32),
  BORDER_RADIUS_SM: vw(4),
  BORDER_RADIUS_MD: vw(6),
  BORDER_RADIUS_LG: vw(8),
  IMAGE_SIZE: vh(70),
  PRODUCT_IMAGE_HEIGHT: vh(120),
  BANNER_HEIGHT: vh(130),
  QUANTITY_WIDTH: vw(100),
} as const;

// Width percentages
export const WIDTH_PERCENTAGES = {
  FULL: '100%',
  LARGE: '80%',
  MEDIUM: '70%',
  SMALL: '60%',
  EXTRA_SMALL: '40%',
  CARD: '31%',
} as const;

// Default values
export const DEFAULTS = {
  WIDTH: '100%',
  HEIGHT: vh(20),
} as const;

// Animation values
export const ANIMATION = {
  DURATION: 1000,
  OPACITY_MIN: 0.3,
  OPACITY_MAX: 0.7,
} as const;
