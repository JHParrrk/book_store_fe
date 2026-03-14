import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home';
import Layout from '@/components/layout/layout';
import Basket from '@/pages/Basket';
import BookDetail from '@/pages/BookDetail';
import Books from '@/pages/books';
import Login from '@/pages/login';
import Order from '@/pages/Order';
import OrderList from '@/pages/OrderList';
import OrderDetail from '@/pages/OrderDetail';
import PaymentComplete from '@/pages/PaymentComplete';
import MyPage from '@/pages/MyPage';
// import ResetPassword from "@/pages/ResetPassword";
import Signup from '@/pages/signup';
import Error from '@/components/commons/error';

/**
 * 🗺️ 라우트 목록 정의
 * URL 경로(path)와 해당 경로에서 보여줄 페이지 컴포넌트(element)를 매핑합니다.
 */
const routeList = [
  {
    path: '/', // 기본 홈페이지 라우트
    element: <Home />,
  },
  {
    path: '/books/search', // 책 검색/목록 페이지 라우트
    element: <Books />,
  },
  {
    path: '/signup', // 회원가입 페이지 라우트
    element: <Signup />,
  },
  // {
  //   path: "/reset", // 비밀번호 초기화 라우트 (현재 주석 처리됨)
  //   element: <ResetPassword />,
  // },
  {
    path: '/login', // 로그인 페이지 라우트
    element: <Login />,
  },
  {
    path: '/mypage', // 마이페이지 라우트
    element: <MyPage />,
  },
  {
    path: '/books/:bookId', // 구조 분해 할당 파라미터(:bookId)를 받는 책 상제 페이지 라우트
    element: <BookDetail />,
  },
  {
    path: '/basket', // 장바구니 페이지 라우트
    element: <Basket />,
  },
  {
    path: '/order', // 주문 페이지 라우트
    element: <Order />,
  },
  {
    path: '/orderlist/:orderId',
    element: <OrderDetail />,
  },
  {
    path: '/orderlist/:orderId/complete',
    element: <PaymentComplete />,
  },
  {
    path: '/orderlist', // 내 주문 내역 페이지 라우트
    element: <OrderList />,
  },
];

/**
 * 🚥 라우터 생성 (React Router DOM v6)
 * createBrowserRouter 함수를 사용해 전역 라우트 시스템을 구축합니다.
 * map()을 통해 각 라우트에 공통 Layout 및 ErrorBoundary(Error 컴포넌트)를 일괄 적용합니다.
 */
export const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      // 모든 페이지 컴포넌트들은 공통 Layout의 children으로 감싸져서 렌더링됩니다.
      element: <Layout>{item.element}</Layout>,
      // 라우트 안에서 발생하는 에러는 모두 이 지정된 컴포넌트에서 Catch됩니다.
      errorElement: <Error />,
    };
  }),
);
