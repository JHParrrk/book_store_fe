import { QueryClient } from '@tanstack/react-query';

// React Query의 중앙 설정 파일 (서버 상태 관리자)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // API 호출 실패 시 재시도 횟수 (1번 더 시도함)
      retry: 1, 
      // 사용자가 브라우저 탭을 이탈했다가 돌아왔을 때 API를 다시 쏠 것인지 여부 (캐시 최적화를 위해 false)
      refetchOnWindowFocus: false, 
      // 데이터를 얼마나 오랫동안 '신선(fresh)'하다고 판단할 것인지 (5분 동안은 캐시된 데이터 무조건 사용)
      staleTime: 1000 * 60 * 5, 
      // 데이터가 새로 페칭되는 동안 화면이 깜빡거리지 않게 이전 데이터를 유지 (UX 부드럽게)
      placeholderData: (previousData: any) => previousData, 
    },
    mutations: {
      // POST, PUT, DELETE 등 데이터를 조작하는 과정에서 에러가 났을 때의 글로벌 예외 처리
      onError: (error: any) => {
        // 전역적인 에러 로깅 포인트
        console.error('Mutation Error:', error.message);
      },
    },
  },
});
