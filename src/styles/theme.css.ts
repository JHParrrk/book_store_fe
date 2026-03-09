import { createThemeContract, createTheme } from '@vanilla-extract/css';

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
    background: '#f8f9fa', // 연한 회색/흰색 계열이 나음
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
    background: '#333', // 다크모드 배경색
    secondary: '#ccc', // 다크모드 보조색
    third: 'lightgreen',
    border: '#555',
    text: 'white', // 다크모드 글자색
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

import { style } from '@vanilla-extract/css';

export const appWrapper = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.color.background,
  color: vars.color.text,
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
});
