import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle, StyleProp } from 'react-native'; // Added ViewStyle, StyleProp
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';

interface ScreenContainerProps {
  children: ReactNode;
  paddingTop?: number;
  marginBottom?: number;
  scrollable?: boolean;
  scrollEndPadding?: number; // Added new prop
}

const TAB_BAR_HEIGHT = 50; // Height of CustomTabBar

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  paddingTop = 40,
  marginBottom = 140,
  scrollable = true,
  scrollEndPadding = 20, // Added new prop with default value
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme(); // theme is used but not directly in the logic being changed here

  // Common style for the content area (whether ScrollView's contentContainer or View)
  const contentAreaStyle: StyleProp<ViewStyle> = [
    styles.container, // Includes flexGrow: 1, alignItems: 'center', width: '100%', minHeight: '100%'
    {
      paddingTop,
      paddingBottom: TAB_BAR_HEIGHT + insets.bottom + scrollEndPadding, // Used new prop
    },
  ];

  // Common style for the outer ScrollView or View element
  const outerElementStyle: StyleProp<ViewStyle> = [
    styles.scrollView, // Includes width: '100%'
    { marginBottom: marginBottom }, // Using marginBottom value received as prop
  ];

  if (scrollable) {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={contentAreaStyle}
        style={outerElementStyle}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  } else {
    // For non-scrollable, contentAreaStyle and outerElementStyle are combined for the View
    // styles.container has flexGrow: 1, which is crucial for the View to expand
    return (
      <View style={[outerElementStyle, contentAreaStyle]}>
        {children}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
    // minHeight: '100%', // Removed to prevent overlap when not scrollable
  },
});

export default ScreenContainer;