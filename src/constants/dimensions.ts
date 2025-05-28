/**
 * Layout and dimension constants used throughout the application
 */

export const LAYOUT_CONSTANTS = {
  // Tab bar dimensions
  TAB_BAR_HEIGHT: 50,
  
  // Screen container default values
  SCREEN_CONTAINER: {
    DEFAULT_PADDING_TOP: 10,
    DEFAULT_MARGIN_BOTTOM: 110,
    DEFAULT_SCROLL_END_PADDING: 20,
  },
  
  // Screen header default values
  SCREEN_HEADER: {
    DEFAULT_MARGIN_BOTTOM: 10,
    TOP_OFFSET: 10,
    WIDTH_PERCENTAGE: '90%',
    PADDING: 15,
    BORDER_RADIUS: 10,
    Z_INDEX: 10,
  },
  
  // Common spacing values
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    XXL: 48,
  },
  
  // Font sizes
  FONT_SIZES: {
    SMALL: 12,
    MEDIUM: 14,
    LARGE: 16,
    X_LARGE: 18,
    XX_LARGE: 20,
    XXX_LARGE: 24,
  },

  // Background component constants
  BACKGROUND: {
    OVERLAY_OPACITY: 0.1,
    FULL_SIZE: '100%',
    FADE_DURATION: 0,
  },
} as const;
