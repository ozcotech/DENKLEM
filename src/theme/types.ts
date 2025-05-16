export type ThemeType = {
  colors: {
    background: string[];
    text: {
      primary: string;
      secondary: string;
    };
    button: {
      text: string;
      border: string;
      shadow: string;
    };
    card: {
      background: string;
      shadow: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
};