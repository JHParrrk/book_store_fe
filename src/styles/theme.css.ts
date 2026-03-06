import {
  createThemeContract,
  createTheme,
  globalStyle,
} from '@vanilla-extract/css';

// ==========================================
// 1. Vanilla Extract Theme Contract (디자인 시스템 변수 뼈대)
// ==========================================
// 아래 vars 객체는 타입스크립트처럼 동작하며, 실제 값은 비어있습니다(null). 
// 이 변수 컨트랙트를 기반으로 Light/Dark 테마가 구조에 맞춰 구현되어야 함을 강제합니다.
export const vars = createThemeContract({
  color: {
    primary: null,
    background: null,
    secondary: null,
    third: null,
    border: null,
    text: null,
    background_light: null,
  },
  fontSize: {
    small: null,
    medium: null,
    large: null,
  },
  spacing: {
    small: null,
    medium: null,
    large: null,
  },
  borderRadius: {
    default: null,
  },
});

// ==========================================
// 2. Light Theme Configuration (라이트 모드 실제 토큰)
// ==========================================
// createTheme(컨트랙트, 실제값)을 호출하면 빌드 시 고유한 클래스명이 반환됩니다.
export const lightTheme = createTheme(vars, {
  color: {
    primary: '#ff5800',
    background: 'lightgray',
    secondary: '#5f5f5f',
    third: 'green',
    border: 'gray',
    text: 'black',
    background_light: 'white',
  },
  fontSize: {
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
  },
  spacing: {
    small: '0.25rem 0.5rem',
    medium: '0.5rem 1rem',
    large: '1rem 2rem',
  },
  borderRadius: {
    default: '4px',
  },
});

// ==========================================
// 3. Dark Theme Configuration (다크 모드 실제 토큰)
// ==========================================
export const darkTheme = createTheme(vars, {
  color: {
    primary: '#ff5800',
    background: '#333',     // 다크모드 배경색
    secondary: '#ccc',      // 다크모드 보조색
    third: 'lightgreen',
    border: '#555',
    text: 'white',          // 다크모드 글자색
    background_light: '#444',
  },
  fontSize: {
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
  },
  spacing: {
    small: '0.25rem 0.5rem',
    medium: '0.5rem 1rem',
    large: '1rem 2rem',
  },
  borderRadius: {
    default: '4px',
  },
});

// ==========================================
// 4. Global Styles (Reset & Base)
// ==========================================
// 전역 CSS를 Vanilla Extract로 정의합니다.
globalStyle('html, body', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  fontFamily: 'system-ui, -apple-system, sans-serif',
});

// 모든 엘리먼트의 박스 사이징을 통일합니다.
globalStyle('*', {
  boxSizing: 'inherit',
});

// ==========================================
// 5. [Legacy] Styled Components Theme (하위 호환성 유지)
// ==========================================
// 아래 코드는 아직 Vanilla Extract로 넘어오지 못한 구형 컴포넌트들을 위해
// 기존의 styled-components 테마 구조를 그대로 유지시켜주기 위한 임시 폴백입니다.
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
    secondary: 'darkblue',
    third: 'darkgreen',
    text: 'white',
    background_light: '#333',
  },
};

// 동적으로 테마 객체를 반환해주는 편의 함수
export const getTheme = (themeName: ThemeName): Theme => {
  return themeName === 'light' ? light : dark;
};
