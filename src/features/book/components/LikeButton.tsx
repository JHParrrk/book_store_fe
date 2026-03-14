import React from 'react';
import styled from 'styled-components';
import { BookDetail } from '@/features/book/types/book.model';
import Button from '@/components/commons/Button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Props {
  book: BookDetail;
  onClick: () => void;
}

const LikeButton = ({ book, onClick }: Props) => {
  return (
    <LikeButtonStyle
      size="medium"
      scheme="normal"
      onClick={onClick}
      $isLiked={book.isLiked}
    >
      {book.isLiked ? <FaHeart /> : <FaRegHeart />}
      {book.likes}
    </LikeButtonStyle>
  );
};

// isLiked prop을 이용해 스타일을 동적으로 조절할 수도 있습니다.
const LikeButtonStyle = styled(Button)<{ $isLiked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;

  /* isLiked 상태에 따라 로직 처리해도 되고, scheme('like'/'normal')로 처리되어 있어서 색상 상속만 잘 시키면 됩니다 */
  svg {
    color: ${({ $isLiked, theme }) =>
      $isLiked ? theme.color.primary : 'inherit'};
    font-size: 1.1rem;
    * {
      color: inherit;
    }
  }
`;

export default LikeButton;
