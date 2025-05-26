import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';

interface ThemedBackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showOverlayImage?: boolean; // Yeni prop eklendi
}

const ThemedBackground: React.FC<ThemedBackgroundProps> = ({ 
  children, 
  style, 
  showOverlayImage = false // Varsayılan değer false
}) => {
  const theme = useTheme();
  
  return (
    <LinearGradient 
      colors={theme.colors.background} 
      style={[styles.container, style]}
    >
      {showOverlayImage && ( // Sadece showOverlayImage true ise render et
        <Image
          source={require('../../../assets/images/hand-shake.png')}
          style={styles.overlayImage}
          resizeMode="cover" 
          fadeDuration={0} 
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
    width: '100%',
    height: '100%',
    opacity: 0.10,
  },
});

export default ThemedBackground;