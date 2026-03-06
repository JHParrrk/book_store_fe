import React from 'react';
import { ColorKey, HeadingSize } from '@/styles/theme.css';
import * as styles from '@/components/commons/title.css';

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

const Title = ({ children, size, color }: Props) => {
  const classNames = [
    styles.titleSize[size],
    color ? styles.titleColor[color] : styles.titleColor.primary,
  ]
    .join(' ')
    .trim();

  return <h1 className={classNames}>{children}</h1>;
};

export default Title;
