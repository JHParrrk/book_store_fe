import React from 'react';
import { ButtonScheme, ButtonSize } from '@/styles/theme';
import * as styles from '@/components/commons/button.css';

// 기존 HTML 버튼의 속성들을 상속받아 커스텀 버튼 컴포넌트의 Props를 정의합니다.
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize; // 버튼 크기 (대, 중, 소)
  scheme: ButtonScheme; // 버튼 색상 테마 (주 컬러, 보조 컬러 등)
  disabled?: boolean; // 비활성화 여부
  isLoading?: boolean; // 데이터 로딩 상태 지원용 (향후 스피너 등에 활용)
}

/**
 * 📚 전역 기반 Button 컴포넌트
 * Vanilla Extract 객체 기반으로 사이즈, 색상, 상태(disabled)별 클래스를 조립(join)하여 적용합니다.
 */
const Button = ({
  children,
  size,
  scheme,
  disabled,
  isLoading,
  ...props
}: Props) => {
  // Vanilla Extract에서 생성된 해시 클래스명들을 배열에 담아 빈칸(' ')으로 연결합니다.
  const classNames = [
    styles.buttonBase, // 1. 공통 뼈대 (테두리, 커서 모양 등)
    styles.buttonSize[size], // 2. 크기별 클래스 동적 할당
    styles.buttonScheme[scheme], // 3. 색상별 클래스 동적 할당
    disabled ? styles.disabledState : '', // 4. 비활성화 시 반투명 등 상태 추가
  ]
    .join(' ')
    .trim();

  return (
    <button className={classNames} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
