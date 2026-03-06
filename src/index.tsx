import React from 'react';
import ReactDOM from 'react-dom/client';

// Vanilla Extract의 전역 스타일(body 초기화 등)을 불러옵니다.
import '@/styles/global.css';
import App from '@/App';

// React 18의 createRoot API를 사용해 애플리케이션의 진입점을 초기화합니다.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  // React.StrictMode: 개발 과정에서 잠재적 문제를 찾기 위해 렌더링을 2번씩 실행시키는 엄격 모드 래퍼입니다. (운영 빌드 시엔 무시됨)
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
