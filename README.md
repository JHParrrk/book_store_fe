# 📚 Book Store FE

<p align="center">
  <img src="https://img.shields.io/badge/Vite-%23646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React-%2361DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-%233178C6?logo=typescript&logoColor=white" alt="TypeScript" />
</p>

---

> **"단순한 화면 구성을 넘어, 도메인 중심 설계와 성능 최적화 철학이 담긴 UI/UX"**  
> 비즈니스 로직의 독립성을 보장하고, 풍부한 사용자 인터페이스를 안정적으로 제공하기 위해 설계되었습니다.

---

## 🔗 Quick Links

- 🌐 **Live Demo**: [준비 중 혹은 링크 입력]
- 🖥️ **Backend Repository**: [백엔드 레포지토리 링크 입력]

---

## 🏗️ 프로젝트 개요 (Project Overview)

엔터프라이즈급 **FDD(Feature-Driven Architecture)**가 적용된 모던 온라인 서점 프론트엔드 프로젝트입니다. 기술적 역할(Components, Hooks 등)에 얽매이기보다 비즈니스 도메인(Auth, Book, Cart, Order 등)을 중심으로 코드를 응집시켜 대규모 스케일업 환경에서도 높은 유지보수성을 가지도록 설계했습니다.

### 🎯 주요 목표

- **도메인 중심 모듈화 (FDD):** 스파게티 코드를 방지하고 각 식별된 기능(Feature)이 독립적으로 작동하도록 캡슐화.
- **성능 및 렌더링 최적화:** Zero-runtime CSS 도입 및 서버/클라이언트 상태의 완벽한 분리를 통한 렌더링 효율 향상.
- **타입 안정성 (Type Safety):** 런타임 에러 방지를 위한 철저한 TypeScript 및 Zod 기반 데이터 검증.
- **유연한 디자인 시스템:** Vanilla Extract와 Styled-components의 점진적 마이그레이션 및 테마 호환성 지원.

---

## ✨ 핵심 기능 (Key Features)

### 🧠 1. 비즈니스 도메인 주도 설계 (Feature-Driven Design)

- **Structure:** `features/` 디렉토리 아래에 **auth, book, cart, order, main** 등 핵심 비즈니스 도메인을 독립적인 모듈로 격리했습니다.
- **Maintenance:** 코드가 기술적 레이어(컴포넌트, 훅, API)가 아닌 비즈니스 기능 단위로 묶여 있어 횡단 관심사 얽힘을 방지하고 코드 탐색 및 유지보수가 압도적으로 수월합니다.

### 🎨 2. Zero-Runtime CSS 기반 테마 전략 (Vanilla Extract)

- **Optimization:** 런타임 오버헤드가 없는 **Vanilla Extract**를 주력으로 채택해 CSS-in-JS의 성능적 한계를 극복했습니다.
- **Compatibility:** 마이그레이션 과도기를 대비해 `ThemeContext`에서 레거시 시스템(`styled-components`)과 신규 디자인 시스템(`Vanilla Extract`)을 동시에 안정적으로 주입합니다.

### 🔄 3. 서버-클라이언트 상태의 완벽한 분리

- **Server State:** **@tanstack/react-query**를 활용하여 데이터 페칭, 캐싱, 서버 데이터 동기화를 전담하여 API 요청 최적화를 이뤄냈습니다.
- **Client State:** UI 제어(모달, 테마 등) 관련 전역 상태는 경량화된 **Zustand** 스토어를 활용하여 불필요한 렌더링 사이클을 제거했습니다.

### 🛡️ 4. 안전한 폼 데이터 처리 및 검증 로직

- **Automation:** **React Hook Form**과 **Zod**를 결합하여 불필요한 커스텀 로직 없이 선언적이고 타입 안전한 폼 유효성 검증을 구현했습니다.

---

## 🛠 기술 스택 (Tech Stack)

<p align="center">
  <img src="https://img.shields.io/badge/Vite-%23646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React-%2361DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-%233178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tanstack%20Query-%23FF4154?logo=react-query&logoColor=white" alt="Tanstack Query" />
  <img src="https://img.shields.io/badge/Zustand-%23000000?logo=zeit&logoColor=white" alt="Zustand" />
</p>

### Frontend & Infrastructure

- **Core Framework:** React 18, Vite, TypeScript
- **State Management:** @tanstack/react-query (서버 상태), Zustand (클라이언트 UI 상태)
- **Styling & UI:** Vanilla Extract, styled-components, Radix UI(Primitives), Framer Motion
- **Form & Validation:** React Hook Form, Zod
- **Networking:** Axios (Custom Interceptors 연동)

---

## 📂 프로젝트 구조 (Project Structure)

```text
src/
├── apis/            # Axios 인스턴스 및 QueryClient 등 글로벌 API 설정
├── components/      # 도메인에 종속되지 않는 글로벌 공통 UI (Button, Modal 등)
├── contexts/        # 글로벌 React Contexts (ThemeContext)
├── features/        # 🎯 핵심 비즈니스 도메인 (FDD 기반)
│   ├── auth/        # 인증 및 회원 로직 (store, api, components 등 격리)
│   ├── book/        # 개별 도서 상세/리뷰 처리 로직
│   ├── cart/        # 장바구니 도메인 로직
│   ├── main/        # 랜딩 및 메인 전시 로직
│   └── order/       # 주문 및 결제 파이프라인
├── pages/           # Route에 매핑되는 최상위 페이지 컴포넌트
├── stores/          # 글로벌 단계의 Zustand 상태 중앙 관리도구 (authStore, toastStore)
├── styles/          # 디자인 토큰 및 Vanilla Extract 테마 컨트랙트
└── utils/           # 도메인 비종속적 유틸리티 (포맷팅 등)
```

---

## ⚙️ 시작하기 (Getting Started)

### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 필요한 백엔드 API URL 등을 설정합니다. (필요 시 작성)

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 2. 설치 및 실행

```bash
# 1. 저장소 클론
$ git clone https://github.com/your-repo/book_store_fe.git
$ cd book_store_fe

# 2. 의존성 설치
$ npm install

# 3. 환경 변수 설정
# 프로젝트 루트에 .env 파일 생성 후 필요한 변수 추가
$ echo "VITE_API_BASE_URL=http://localhost:3000" > .env

# 4. Vite 개발 서버 실행
$ npm run dev

# 5. 메인 모드 실행
# 메인 컴퓨터에서 백엔드 서버와 함께 프론트엔드를 실행할 때 사용
$ npm run main

# 6. 서브 모드 실행
# 메인 컴퓨터에서 프론트엔드만 실행하고, 서브 컴퓨터의 백엔드 서버를 참조할 때 사용
$ npm run sub

# 7. 프로덕션 빌드 (결과물은 /dist에 생성)
$ npm run build
```

---

## 📄 주요 기능 (Key Features/Pages)

| 도메인    | 경로                   | 주요 컴포넌트 / 화면                                                |
| --------- | ---------------------- | ------------------------------------------------------------------- |
| **Auth**  | `/login`, `/signup`    | JWT 토큰 기반 로그인, Zod 폼 검증 기반 회원가입                     |
| **Main**  | `/` (Home)             | 배너 스와이프, 테마 스위칭 기능, 추천 도서 목록 전시                |
| **Book**  | `/books`, `/book/:id`  | 도서 목록 검색(Pagination), 도서 상세조회 및 리뷰 CRUD, 좋아요 토글 |
| **Cart**  | `/cart`                | 장바구니 추가, 수량 수정 및 선택된 상품 합계 계산 로직              |
| **Order** | `/order`, `/orderlist` | 배송 정보 입력 폼, 주문 생성 및 주문 내역 조회                      |

---

## 📄 라이선스 (License)

본 프로젝트는 MIT License를 따릅니다.
