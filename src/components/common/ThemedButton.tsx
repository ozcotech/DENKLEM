import React, { ReactNode } from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
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
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18, 
    borderWidth: 0.5, 
    width: '85%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, 
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  buttonText: {
    
    textAlign: 'center',
  },
});

export default ThemedButton;