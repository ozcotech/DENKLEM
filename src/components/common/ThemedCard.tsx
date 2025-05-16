import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface ThemedCardProps {
  children: React.ReactNode;
  style?: object;
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
    width: '85%',
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', 
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
});