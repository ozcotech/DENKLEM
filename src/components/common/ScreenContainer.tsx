import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LAYOUT_CONSTANTS } from '../../constants/dimensions';

interface ScreenContainerProps {
  children: ReactNode;
  paddingTop?: number;
  marginBottom?: number;
  scrollable?: boolean;
  scrollEndPadding?: number;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  paddingTop = LAYOUT_CONSTANTS.SCREEN_CONTAINER.DEFAULT_PADDING_TOP,
  marginBottom = LAYOUT_CONSTANTS.SCREEN_CONTAINER.DEFAULT_MARGIN_BOTTOM,
  scrollable = true,
  scrollEndPadding = LAYOUT_CONSTANTS.SCREEN_CONTAINER.DEFAULT_SCROLL_END_PADDING,
}) => {
  const insets = useSafeAreaInsets();

  // Common style for the content area (whether ScrollView's contentContainer or View)
  const contentAreaStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      paddingTop,
      paddingBottom: LAYOUT_CONSTANTS.TAB_BAR_HEIGHT + insets.bottom + scrollEndPadding,
    },
  ];

  // Common style for the outer ScrollView or View element
  const outerElementStyle: StyleProp<ViewStyle> = [
    styles.scrollView,
    { marginBottom: marginBottom },
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
    // For non-scrollable content
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
  },
});

export default ScreenContainer;