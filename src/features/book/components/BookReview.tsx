import {
  BookReviewItemWrite,
  BookReviewItem as IBookReviewItem,
} from '@/features/book/types/book.model';
import React from 'react';
import styled from 'styled-components';
import BookReviewItem from '@/features/book/components/BookReviewItem';
import BookReviewAdd from '@/features/book/components/BookReviewAdd';

interface Props {
  reviews: IBookReviewItem[];
  onAdd: (data: BookReviewItemWrite) => void;
  onUpdate: (reviewId: string, data: BookReviewItemWrite) => void;
  onDelete: (reviewId: string) => void;
}

const BookReview = ({ reviews, onAdd, onUpdate, onDelete }: Props) => {
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReviewItem
          key={review.id}
          review={review}
          onDelete={() => onDelete(review.id.toString())}
          onUpdate={(data) => onUpdate(review.id.toString(), data)}
        />
      ))}
    </BookReviewStyle>
  );
};

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReview;
