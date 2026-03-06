import React from 'react';
import Title from '@/components/commons/Title';
import * as styles from '@/components/commons/empty.css';

interface Props {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
}

const Empty = ({ icon, title, description }: Props) => {
  return (
    <div className={styles.emptyContainer}>
      {icon && <div className={styles.emptyIcon}>{icon}</div>}
      <Title size="large" color="secondary">
        {title}
      </Title>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Empty;
