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

  // Agreement Status screen specific constants
  AGREEMENT_STATUS_SCREEN: {
    CONTAINER: {
      PADDING_HORIZONTAL: '5%', // Reduced from 7.5% to match tabbar width
      PADDING_TOP: 60,          // Added to push content down
    },
    TOGGLE_BUTTON: {
      HEIGHT: 140,      // Increased height to match DisputeCategoryScreen's halfButton
      MIN_HEIGHT: 100,  // Adjusted minHeight
    },
  },
} as const;

// Tariff calculation constants
export const TARIFF_CALCULATION = {
  MINIMUM_HOURS_MULTIPLIER: 2, // Non-agreement cases require minimum 2 hours calculation
  VALIDATION: {
    MIN_PARTY_COUNT: 0,
    MIN_AMOUNT: 0,
  },
  ARRAY_ACCESS: {
    LAST_INDEX_OFFSET: 1, // For accessing last element: array.length - 1
  },
} as const;

// Dispute type constants for type safety
export const DISPUTE_TYPES = {
  DEFAULT: 'Diğer',
  COMMERCIAL: 'Ticari',
  RENT: 'Kira',
  PARTNERSHIP_DISSOLUTION: 'Ortaklığın Giderilmesi',
  WORKER_EMPLOYER: 'İşçi-İşveren',
  CONSUMER: 'Tüketici',
  FAMILY: 'Aile',
} as const;

// Dispute type keywords for mapping
export const DISPUTE_TYPE_KEYWORDS = {
  RENT: 'Kira',
  PARTNERSHIP: 'Ortaklık',
} as const;

// Responsive design constants
export const RESPONSIVE_DESIGN = {
  // Screen height breakpoints for different device sizes
  SCREEN_HEIGHT_BREAKPOINTS: {
    SMALL: 700,   // iPhone SE and similar small devices
    MEDIUM: 800,  // iPhone 8, X, 11, 12, 13, 14
    // LARGE: 800+ // iPhone Plus, Pro Max and larger devices
  },
  
  // Dynamic padding values for keyboard avoidance
  KEYBOARD_AVOIDANCE_PADDING: {
    SMALL_SCREEN: 70,   // For screens < 700px height
    MEDIUM_SCREEN: 50,  // For screens 700-800px height  
    LARGE_SCREEN: 30,   // For screens > 800px height
  },
  
  // Scroll offset constants for input focus
  INPUT_FOCUS_SCROLL: {
    TOP_OFFSET: 150,        // Pixels from top when scrolling to focused input
    SCROLL_DELAY: 100,      // Milliseconds delay before scrolling
    ANIMATION_DURATION: 300, // Scroll animation duration
  },
} as const;

// Utility function to get dynamic padding based on screen height
export const getDynamicKeyboardPadding = (screenHeight: number): number => {
  if (screenHeight < RESPONSIVE_DESIGN.SCREEN_HEIGHT_BREAKPOINTS.SMALL) {
    return RESPONSIVE_DESIGN.KEYBOARD_AVOIDANCE_PADDING.SMALL_SCREEN;
  } else if (screenHeight < RESPONSIVE_DESIGN.SCREEN_HEIGHT_BREAKPOINTS.MEDIUM) {
    return RESPONSIVE_DESIGN.KEYBOARD_AVOIDANCE_PADDING.MEDIUM_SCREEN;
  } else {
    return RESPONSIVE_DESIGN.KEYBOARD_AVOIDANCE_PADDING.LARGE_SCREEN;
  }
};
