import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { LAYOUT_CONSTANTS } from '../../constants/dimensions';

interface ThemedCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({ children, style }) => {
  const theme = useTheme();
  
  return (
    <View
      style={[
        styles.card,
        { 
          backgroundColor: theme.colors.card.background,
          shadowColor: theme.colors.card.shadow,
          borderRadius: theme.borderRadius.medium,
        }, 
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: LAYOUT_CONSTANTS.CARD.DEFAULT_WIDTH,
    padding: LAYOUT_CONSTANTS.CARD.DEFAULT_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOffset: {
      width: LAYOUT_CONSTANTS.CARD.SHADOW_OFFSET.WIDTH,
      height: LAYOUT_CONSTANTS.CARD.SHADOW_OFFSET.HEIGHT,
    },
    shadowOpacity: LAYOUT_CONSTANTS.CARD.SHADOW_OPACITY,
    shadowRadius: LAYOUT_CONSTANTS.CARD.SHADOW_RADIUS,
    elevation: LAYOUT_CONSTANTS.CARD.ELEVATION,
  },
});