import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { LAYOUT_CONSTANTS } from '../../constants/dimensions';
import { ASSET_PATHS } from '../../constants/assets';

interface ThemedBackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showOverlayImage?: boolean;
}

const ThemedBackground: React.FC<ThemedBackgroundProps> = ({ 
  children, 
  style, 
  showOverlayImage = false
}) => {
  const theme = useTheme();
  
  return (
    <LinearGradient 
      colors={theme.colors.background} 
      style={[styles.container, style]}
    >
      {showOverlayImage && (
        <Image
          source={ASSET_PATHS.IMAGES.HAND_SHAKE}
          style={styles.overlayImage}
          resizeMode="cover" 
          fadeDuration={LAYOUT_CONSTANTS.BACKGROUND.FADE_DURATION} 
        />
      )}
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayImage: {
    position: 'absolute',
    width: LAYOUT_CONSTANTS.BACKGROUND.FULL_SIZE,
    height: LAYOUT_CONSTANTS.BACKGROUND.FULL_SIZE,
    opacity: LAYOUT_CONSTANTS.BACKGROUND.OVERLAY_OPACITY,
  },
});

export default ThemedBackground;