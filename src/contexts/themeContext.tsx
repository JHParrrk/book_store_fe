import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme, appWrapper } from '@/styles/theme.css';
import { getTheme } from '@/styles/theme';
import { ThemeProvider } from 'styled-components';

// 1. 초기 테마 값 및 로컬 스토리지 저장 키 설정
const DEFAULT_THEME_NAME: 'light' | 'dark' = 'light';
const THEME_LOCALSTORAGE_KEY = 'book_store_theme';

// 2. Context에서 전역적으로 관리할 상태 타입 정의
interface ThemeContextState {
  themeName: 'light' | 'dark'; // 현재 적용된 테마 ('light' 또는 'dark')
  toggleTheme: () => void; // 테마를 전환하는 함수
}

// 3. Context 생성 시 제공할 기본값 (Provider 밖에서 쓰일 경우의 Fallback)
const defaultState: ThemeContextState = {
  themeName: DEFAULT_THEME_NAME,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextState>(defaultState);

export const BookStoreThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // 사용자의 화면 테마를 관리하는 로컬 State (기본값: 'light')
  const [themeName, setThemeName] = useState<'light' | 'dark'>(
    DEFAULT_THEME_NAME,
  );

  // 컴포넌트 마운트 시 브라우저 LocalStorage에 저장된 유저의 이전 테마 환경 설정을 불러옴
  useEffect(() => {
    const savedThemeName =
      (localStorage.getItem(THEME_LOCALSTORAGE_KEY) as 'light' | 'dark') ||
      DEFAULT_THEME_NAME;
    setThemeName(savedThemeName);
  }, []);

  // 토글 버튼 클릭 시 호출되는 함수 (light <-> dark 변환 및 로컬스토리지 동기화)
  const toggleTheme = () => {
    setThemeName((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_LOCALSTORAGE_KEY, nextTheme); // 다음 방문을 위해 저장
      return nextTheme;
    });
  };

  // Vanilla Extract용 클래스명 (css 파일에서 빌드된 정적 해시 클래스명 반환)
  const currentTheme = themeName === 'light' ? lightTheme : darkTheme;
  // Styled-Components 역호환성을 위한 구형 테마 객체 반환
  const styledTheme = getTheme(themeName);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {/* 구형 Styled-Components 지원용 Provider 유지 (마이그레이션 중간 단계 안전장치) */}
      <ThemeProvider theme={styledTheme}>
        {/* Vanilla Extract 적용을 위해 가장 최상단 div에 테마 클래스명(해시) 부여 */}
        <div className={`${currentTheme} ${appWrapper}`}>{children}</div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
