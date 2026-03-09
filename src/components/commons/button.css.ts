import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

// 1. 공통 뼈대 스타일 (크기나 색상에 구애받지 않는 글로벌 속성)
export const buttonBase = style({
  border: 0,
  borderRadius: vars.borderRadius.default, // theme.css.ts에 정의된 Contract 변수 사용 (타입 안정성 보장)
  cursor: 'pointer',
});

// 2. 크기에 관련된 Variants (컴포넌트의 props.size에 매핑될 목록들)
export const buttonSize = styleVariants({
  large: { fontSize: '1.5rem', padding: '1rem 2rem' },
  medium: { fontSize: '1rem', padding: '0.5rem 1rem' },
  small: { fontSize: '0.75rem', padding: '0.25rem 0.5rem' },
});

// 3. 색상 스키마에 관련된 Variants (컴포넌트의 props.scheme에 매핑될 목록들)
export const buttonScheme = styleVariants({
  primary: { color: 'white', backgroundColor: vars.color.primary },
  normal: {
    color: vars.color.text,
    backgroundColor: vars.color.background_light,
  },
  like: { color: 'white', backgroundColor: 'coral' },
});

// 4. 상태 관련 Modifier
export const disabledState = style({
  opacity: 0.5,
  pointerEvents: 'none', // 클릭 등 마우스 이벤트 완전 차단
  cursor: 'default',
});
