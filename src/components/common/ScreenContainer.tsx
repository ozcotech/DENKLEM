import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';

interface ScreenContainerProps {
  children: ReactNode;
  paddingTop?: number;
  marginBottom?: number;
}

const TAB_BAR_HEIGHT = 50; // Height of CustomTabBar

const ScreenContainer: React.FC<ScreenContainerProps> = ({ 
  children, 
  paddingTop = 40,
  marginBottom = 140
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.container,
        { 
          paddingTop,
          paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 30, // Tab bar + bottom safe area + extra padding
        }
      ]}
      style={[styles.scrollView, { marginBottom: marginBottom }]} // Using marginBottom value received as prop
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
    minHeight: '100%',
  },
});

export default ScreenContainer;