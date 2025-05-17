export interface TypographyStyle {
  fontSize: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fontFamily?: string;
  // Add other text style properties if needed: letterSpacing, lineHeight, etc.
}

export interface ThemeTypography {
  h1: TypographyStyle;
  h2: TypographyStyle;
  button: TypographyStyle;
  body: TypographyStyle;
  // Add more styles like subtitle, caption, etc. as needed
}

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
  typography: ThemeTypography; // Added typography
};