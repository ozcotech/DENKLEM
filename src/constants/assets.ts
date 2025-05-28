/**
 * Asset paths and image constants used throughout the application
 */

export const ASSET_PATHS = {
  IMAGES: {
    HAND_SHAKE: require('../../assets/images/hand-shake.png'),
    FIRST_SCREEN_LOGO: require('../../assets/images/first_screen_logo_transparent.png'),
    HOME_ICON: require('../../assets/images/home-icon.png'),
    INFO_ICON: require('../../assets/images/info-icon.png'),
    LEGISLATION_ICON: require('../../assets/images/legislation-icon.png'),
    START_ICON: require('../../assets/images/start-icon.png'),
  },
  PDFS: {
    ARBITRATION_TARIFF_2025: 'bundle-assets://arabuluculuk-tarifesi-2025.pdf',
  },
} as const;
