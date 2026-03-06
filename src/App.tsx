import { BookStoreThemeProvider } from '@/contexts/themeContext';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/apis/queryClient';
import ToastContainer from '@/components/commons/toast/ToastContainer';

/**
 * 🚀 최상위 App 컴포넌트
 * 이 곳에서는 애플리케이션 전체에 영향을 미치는 여러 Provider 패턴들을 주입합니다.
 */
function App() {
  return (
    // 1. React Query Provider: 서버 상태(Server State) 관리 및 캐싱 제공
    <QueryClientProvider client={queryClient}>
      // 2. Theme Provider: 다크/라이트 모드 지원 (Vanilla Extract &
      Styled-Components 하위 호환)
      <BookStoreThemeProvider>
        // 3. Router Provider: React Router DOM 기반의 라우팅 시스템 주입
        <RouterProvider router={router} />
        // 4. 전역 UI 컴포넌트: 페이지 어디서든 호출 가능한 토스트(알림)
        컨테이너
        <ToastContainer />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

export default App;
