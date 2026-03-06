import {
  BookReviewItemWrite,
  BookReviewItem as IBookReviewItem,
} from "@/features/books/types/book.model";
import React from "react";
import styled from "styled-components";
import BookReviewItem from '@/features/book/components/BookReviewItem';
import BookReviewAdd from '@/features/book/components/BookReviewAdd';

interface Props {
  reviews: IBookReviewItem[];
  onAdd: (data: BookReviewItemWrite) => void;
}

const BookReview = ({ reviews, onAdd }: Props) => {
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
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
