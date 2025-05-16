import { ThemeType } from './types';
export const DefaultTheme: ThemeType = {
  colors: {
    background: ['#4f8cff', '#9b40ff', '#e82fff'], 
    text: {
      primary: '#fff',
      secondary: '#d0e8ff',
    },
    button: {
      text: '#fff',
      border: '#fff',
      shadow: 'rgba(255,255,255,0.6)',
    },
    card: {
      background: 'rgba(255,255,255,0.16)', // modern, soft glass
      shadow: '#000',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
  },
  borderRadius: {
    small: 8,
    medium: 20,
    large: 40,
  },
};