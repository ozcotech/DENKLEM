import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';

interface ThemedBackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ThemedBackground: React.FC<ThemedBackgroundProps> = ({ children, style }) => {
  const theme = useTheme();
  
  return (
    <LinearGradient 
      colors={theme.colors.background} 
      style={[styles.container, style]}
    >
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
});

export default ThemedBackground;