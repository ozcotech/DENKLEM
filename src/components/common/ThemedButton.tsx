import React, { ReactNode } from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { LAYOUT_CONSTANTS } from '../../constants/dimensions';
import AnimatedButton from '../AnimatedButton';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  icon
}) => {
  const theme = useTheme();

  return (
    <AnimatedButton
      title={title}
      onPress={onPress}
      icon={icon}
      style={[
        styles.button, 
        { 
          borderColor: theme.colors.button.border,
          shadowColor: theme.colors.button.shadow,
        }, 
        style,
      ]}
      textStyle={[
        styles.buttonText, 
        { color: theme.colors.button.text },
        theme.typography.button, 
        textStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingVertical: LAYOUT_CONSTANTS.BUTTON.PADDING_VERTICAL,
    paddingHorizontal: LAYOUT_CONSTANTS.BUTTON.PADDING_HORIZONTAL,
    borderRadius: LAYOUT_CONSTANTS.BUTTON.BORDER_RADIUS,
    borderWidth: LAYOUT_CONSTANTS.BUTTON.BORDER_WIDTH,
    width: LAYOUT_CONSTANTS.BUTTON.DEFAULT_WIDTH,
    shadowOffset: {
      width: LAYOUT_CONSTANTS.BUTTON.SHADOW_OFFSET.WIDTH,
      height: LAYOUT_CONSTANTS.BUTTON.SHADOW_OFFSET.HEIGHT,
    },
    shadowOpacity: LAYOUT_CONSTANTS.BUTTON.SHADOW_OPACITY,
    shadowRadius: LAYOUT_CONSTANTS.BUTTON.SHADOW_RADIUS,
    elevation: LAYOUT_CONSTANTS.BUTTON.ELEVATION,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default ThemedButton;