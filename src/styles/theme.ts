export type ThemeName = 'light' | 'dark';
export type ColorKey =
  | 'primary'
  | 'background'
  | 'secondary'
  | 'third'
  | 'border'
  | 'text'
  | 'background_light';
export type HeadingSize = 'large' | 'medium' | 'small';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonScheme = 'primary' | 'normal' | 'like';
export type LayoutWidth = 'large' | 'medium' | 'small';
export type MediaQuery = 'mobile' | 'tablet' | 'desktop';

export interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  heading: Record<HeadingSize, { fontSize: string }>;
  button: Record<ButtonSize, { fontSize: string; padding: string }>;
  buttonScheme: Record<
    ButtonScheme,
    { color: string; backgroundColor: string }
  >;
  borderRadius: { default: string };
  layout: { width: Record<LayoutWidth, string> };
  mediaQuery: Record<MediaQuery, string>;
}

export const light: Theme = {
  name: 'light',
  color: {
    primary: '#ff5800',
    background: 'lightgray',
    secondary: '#5f5f5f',
    third: 'green',
    border: 'gray',
    text: 'black',
    background_light: 'white',
  },
  heading: {
    large: { fontSize: '2rem' },
    medium: { fontSize: '1.5rem' },
    small: { fontSize: '1rem' },
  },
  button: {
    large: { fontSize: '1.5rem', padding: '1rem 2rem' },
    medium: { fontSize: '1rem', padding: '0.5rem 1rem' },
    small: { fontSize: '0.75rem', padding: '0.25rem 0.5rem' },
  },
  buttonScheme: {
    primary: { color: 'white', backgroundColor: 'midnightblue' },
    normal: { color: 'black', backgroundColor: 'lightgray' },
    like: { color: 'white', backgroundColor: 'coral' },
  },
  borderRadius: { default: '4px' },
  layout: {
    width: { large: '1020px', medium: '760px', small: '320px' },
  },
  mediaQuery: {
    mobile: '(max-width: 768px)',
    tablet: '(max-width: 1024px)',
    desktop: '(min-width: 1025px)',
  },
};

export const dark: Theme = {
  ...light,
  name: 'dark',
  color: {
    ...light.color,
    primary: 'coral',
    background: 'midnightblue',
    secondary: '#a3a3a3' /* 통상적인 다크모드 서브 텍스트용 회색 계열 */,
    third: 'darkgreen',
    text: 'white',
    background_light: '#333',
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  return themeName === 'light' ? light : dark;
};
