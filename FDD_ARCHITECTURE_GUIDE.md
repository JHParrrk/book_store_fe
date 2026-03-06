# 🏗️ Feature-Driven Architecture (FDD) 도입 가이드 및 장점

이 문서는 기존의 '역할(Type) 중심' 폴더 구조에서 애플리케이션을 **'기능(Feature) 중심'**으로 성공적으로 마이그레이션한 이유와, 이 구조가 갖는 엔터프라이즈급 장점들을 설명합니다. 면접이나 프로젝트 발표 시 아키텍처 도입 근거로 활용하시기 바랍니다.

---

## 1. 기존 폴더 구조의 문제점 (AS-IS: 역할 중심 구조)

과거 프로젝트는 파일의 기술적 **'역할'**에 따라 폴더를 나누었습니다.

```text
src/
├── apis/       # 모든 API (auth.ts, book.ts, order.ts ...)
├── components/ # 모든 UI 컴포넌트
├── hooks/      # 모든 커스텀 훅
└── pages/      # 모든 페이지
```

### 🚨 한계점 (Pain Points)

1. **높은 결합도와 응집도 저하**: '장바구니(Basket)' 기능을 수정하려면 `pages`, `components`, `apis`, `hooks` 4개의 폴더를 이리저리 이동하며 파일을 찾아야 합니다.
2. **사이드 이펙트 위험**: `components` 폴더에 100개의 컴포넌트가 모여 있으면, 특정 도메인에서만 쓰는 컴포넌트인지 전역에서 쓰는 건지 구분이 안 되어 함부로 지우거나 수정하기 두렵습니다.
3. **스케일업(Scale-up) 한계**: 프로젝트가 비대해질수록 각 폴더 안의 파일 개수가 수십~수백 개로 늘어나 코드 파악(Onboarding)이 기하급수적으로 힘들어집니다.

---

## 2. 새로운 폴더 구조 (TO-BE: Feature-Driven Design, FDD)

새로운 구조는 **'비즈니스 도메인(Feature)'**을 기준으로 코드를 묶습니다.

```text
src/
├── components/ # 전역(Global)에서 공통으로 쓰는 UI (Button, Modal 등)
├── features/   # 비즈니스 도메인별 기능 캡슐화 (핵심!)
│   ├── auth/   # 인증 관련 도메인
│   │   ├── api/
│   │   ├── components/
│   │   └── hooks/
│   └── basket/ # 장바구니 관련 도메인
│       ├── api/
│       └── components/
└── pages/      # 단순 라우팅 진입점
```

### 🌟 FDD 구조의 핵심 장점 (Why we chose FDD)

#### ① 완벽한 비즈니스 모듈화 (High Cohesion, Low Coupling)

'장바구니'와 관련된 모든 로직(`api`, `hooks`, `UI`)이 `src/features/basket` 안에 똘똘 뭉쳐있습니다. 장바구니 기능을 수정할 때 다른 폴더를 열어볼 필요가 없으며, 코드가 마치 하나의 독립된 '마이크로 서비스(Micro-Service)'처럼 동작합니다.

#### ② 안전하고 확신 있는 리팩토링 (Safe Refactoring)

`features/auth/components` 안에 있는 컴포넌트는 오직 'auth(인증)' 기능에서만 쓴다는 것이 보장됩니다. 따라서 이 컴포넌트를 수정해도 다른 도메인(예: 도서 상세 페이지)이 망가질 일(Side-Effect)이 전혀 없습니다.

#### ③ 자연스러운 캡슐화와 관심사의 분리 (Separation of Concerns)

전역 상태와 지역 상태가 명확히 분리됩니다. 모든 프로젝트에서 재사용되는 버튼/모달은 최상단 `src/components/commons`로 가고, 특정 도메인에 종속된 로직은 `features` 아래로 숨겨집니다. 이는 주니어 개발자가 합류해도 코드를 어디에 짜야 할지 **'구조가 가이드'**를 해주는 효과가 있습니다.

#### ④ 아키텍처 확장성 (Scalability)

새로운 도메인(예: 쿠폰 기능)을 추가해야 할 때, 기존 폴더들을 오염시키지 않고 `src/features/coupon` 폴더를 새로 만들기만 하면 됩니다. 앱이 아무리 커져도 복잡도는 선형적으로 유지됩니다.

---

## 💡 종합 (Summary for Presentation)

> _"저희 팀은 초기 개발 속도보다는 **장기적인 유지보수성**과 **사이드 이펙트의 최소화**를 목표로 Feature-Driven Architecture 를 채택했습니다. 비즈니스 도메인별로 코드를 격리(Isolation)함으로써, 한 기능의 장애가 전체 시스템으로 전파되는 것을 막고 신규 기능 추가 시 기존 코드의 변경을 최소화하는 엔터프라이즈 레벨의 안정성을 확보했습니다."_
