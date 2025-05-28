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

  // Button component constants
  BUTTON: {
    PADDING_VERTICAL: 12,
    PADDING_HORIZONTAL: 24,
    BORDER_RADIUS: 18,
    BORDER_WIDTH: 0.5,
    DEFAULT_WIDTH: '85%',
    SHADOW_OFFSET: {
      WIDTH: 0,
      HEIGHT: 2,
    },
    SHADOW_OPACITY: 0.2,
    SHADOW_RADIUS: 3,
    ELEVATION: 3,
    // Animation constants
    SCALE_PRESSED: 0.95,
    SCALE_NORMAL: 1,
    ANIMATION_FRICTION: 3,
    ANIMATION_TENSION: 40,
    // Icon spacing
    ICON_MARGIN_RIGHT: 8,
    // Alternative padding for icon buttons
    PADDING_HORIZONTAL_WITH_ICON: 30,
  },

  // Card component constants
  CARD: {
    DEFAULT_WIDTH: '85%',
    DEFAULT_PADDING: '5%',
    SHADOW_OFFSET: {
      WIDTH: 0,
      HEIGHT: 10,
    },
    SHADOW_OPACITY: 0.25,
    SHADOW_RADIUS: 15,
    ELEVATION: 8,
  },

  // About screen specific constants
  ABOUT_SCREEN: {
    SECTION_CARD: {
      WIDTH: '90%',
      PADDING: 20,
      MARGIN_BOTTOM: 25,
      BORDER_RADIUS: 10,
      ELEVATION: 3,
    },
    APP_LOGO: {
      WIDTH: 40,
      HEIGHT: 40,
      MARGIN_RIGHT: 10,
    },
    CONTACT_ITEM: {
      MARGIN_BOTTOM: 15,
      PADDING_VERTICAL: 6,
      PADDING_HORIZONTAL: 8,
      BORDER_RADIUS: 5,
      BACKGROUND_OPACITY: 0.03,
    },
    FEEDBACK_BUTTON: {
      WIDTH: '48%',
    },
    SPACER_HEIGHT: 100,
    LINE_HEIGHT: 24,
    SHARE_BUTTON_MARGIN_TOP: 15,
    COPYRIGHT_MARGIN_TOP: 10,
    COPYRIGHT_MARGIN_BOTTOM: 20,
    TITLE_MARGIN_BOTTOM: 25,
    TEXT_PADDING_HORIZONTAL: 5,
    VERSION_TEXT_MARGIN_TOP: 10,
  },
} as const;
