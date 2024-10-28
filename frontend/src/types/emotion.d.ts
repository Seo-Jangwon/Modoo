export interface ColorType {
  primary: string;
  secondary: string;
  white: string;
  lightgray: string;
  background: string;
  dark: string;
}

export interface TypographyType {
  heading: string;
  title: string;
  subTitle: string;
  body: string;
  bodyBold: string;
  detail: string;
  detailBold: string;
}

export interface ThemeType {
  colors: ColorType;
  typography: TypographyType;
}

// emotion.d.ts
declare module '@emotion/react' {
  export type Theme = ThemeType;
}