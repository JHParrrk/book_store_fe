# Styled-Components vs Vanilla Extract

이 문서는 왜 엔터프라이즈급 현업 프로젝트에서 `styled-components` 대신 `@vanilla-extract/css`를 채택하는지, 두 기술의 근본적인 차이점과 철학을 설명합니다.

---

## 1. 렌더링 방식의 근본적 차이 (Runtime vs Build-time)

### 🔴 Styled-Components (Runtime CSS-in-JS)

- **방식**: 브라우저(런타임)에서 자바스크립트가 실행될 때, 컴포넌트의 `props`를 평가하여 동적으로 CSS 문자열을 생성하고 `<style>` 태그로 `<head>`에 주입합니다.
- **단점 (엔터프라이즈 레벨에서의 한계)**:
  1. **성능 병목**: 사용자가 페이지를 열 때마다 브라우저가 자바스크립트를 파싱하고 CSS를 생성해야 하므로 거대한 앱에서는 렌더링 지연(TTI 지연)이 발생합니다.
  2. **번들 사이즈 증가**: CSS 파서 엔진이 JS 번들에 포함되어 앱 초기 로딩 용량이 커집니다.
  3. **SSR / React Server Components 호환성 마찰**: Next.js 13+ (App Router)나 RSC 환경에서는 브라우저 런타임이 없으므로, 런타임 CSS-in-JS는 설정이 매우 복잡하고 하이드레이션(Hydration) 불일치 에러를 자주 유발합니다.

### 🟢 Vanilla Extract (Zero-Runtime CSS-in-TS)

- **방식**: **빌드 타임(Webpack/Vite)**에 Webpack/Rollup 플러그인이 `.css.ts` 파일을 미리 실행하여 정적인 순수 `.css` 파일을 뽑아냅니다.
- **장점 (전문가적 코드에 적합한 이유)**:
  1. **압도적인 성능 (Zero Runtime overhead)**: 런타임 JS 오버헤드가 **0(Zero)**입니다. 정적 CSS 파일로 분리되어 브라우저 캐싱과 병렬 로딩의 이점을 그대로 누립니다.
  2. **100% 서버 사이드 렌더링 (SSR/RSC) 지원**: 미리 만들어진 정적 클래스명만 넘기기 때문에 다형성이나 컴포넌트 렌더링 위치에 전혀 구애받지 않습니다.
  3. **결정론적 스타일링**: JS가 실행되지 않은 환경(JS Disable)에서도 완벽한 스타일을 보장합니다.

---

## 2. 타입 안정성과 디자인 시스템 (Type Safety)

### 🔴 Styled-Components

- TypeScript와 사용할 때 `DefaultTheme` 인터페이스를 확장해서 사용하지만, 문자열 템플릿 안에서 함수형으로 접근해야 하므로 오타나 누락을 템플릿 내부에서 완벽히 방어하기 어렵습니다.
- 예: `color: ${({ theme }) => theme.color.primery}` // 오타가 나도 에디터 단에서 즉각적인 캐치가 느릴 때가 있습니다.

### 🟢 Vanilla Extract

- 파일 자체가 `.ts`이므로, 완전한 타입스크립트 스키마 제어를 받습니다.
- 변수(`vars`) 객체의 자동 완성을 완벽하게 지원하므로, 오타가 발생하면 빌드 자체가 즉시 실패하여 휴먼 에러를 방지합니다.
- 예: `color: vars.color.primary` // 객체를 다루듯 완벽한 타입 추론

---

## 3. 동적 Props 처리 방식의 차이 (Variants vs String Interpolation)

### 🔴 Styled-Components 방식 (동적 보간)

```tsx
const Button = styled.button<{ $primary?: boolean }>`
  background: ${(props) => (props.$primary ? 'blue' : 'gray')};
`;
```

직관적이라는 장점이 있지만, 상태 조합이 많아질수록 CSS CSSOM 생성 비용이 기하급수적으로 늘어납니다.

### 🟢 Vanilla Extract 방식 (Variants 패턴 제어)

스타일 경우의 수를 컴포넌트 밖(CSS-in-TS)에서 미리 정의(`styleVariants`, `recipes` 등 활용)하고, 컴포넌트는 단지 정해진 클래스명만 조립(결합)하는 방식을 강제합니다.

```tsx
// button.css.ts
export const btnColor = styleVariants({
  primary: { background: vars.color.primary },
  secondary: { background: vars.color.secondary }
})

// Button.tsx
<button className={btnColor[props.color]} />
```

- 이는 강제적으로 **디자인 시스템(Variants)**을 고민하게 만들어, 무분별한 픽셀 오버라이딩(아무 색상이나 예외 처리하는 나쁜 패턴)을 막고 규격화된 UI 개발을 유도합니다.

---

## 요약: 왜 Vanilla Extract를 '더 모던하고 전문가 방식'이라 부르는가?

1. **퍼포먼스 한계를 극복**: JS 생태계가 컴포넌트를 렌더링할 때마다 스타일을 다시 뱉어내는 비효율을 버리고, 예전 정적 CSS의 '빠른 속도'를 되찾기 위한 회귀(Back to Basics)입니다.
2. **Type-Safe CSS**: 기존 SASS, SCSS가 주지 못했던 'VS Code 자동완성'과 '타입 제어'라는 장점만 CSS-in-JS에서 빼왔습니다.
3. **미래 지향적 설계**: React 18과 Next.js 서버 컴포넌트 생태계가 권장하는 **"JS 번들 최소화"** 규칙에 가장 완벽하게 들어맞는 스타일링 솔루션입니다.
