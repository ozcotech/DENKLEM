import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import AnimatedButton from '../AnimatedButton';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle 
}) => {
  const theme = useTheme();

  return (
    <AnimatedButton
      title={title}
      onPress={onPress}
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
        textStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 2,
    width: '85%',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ThemedButton;