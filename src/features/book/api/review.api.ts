import { BookReviewItem, BookReviewItemWrite } from '@/features/books/types/book.model';
import { Pagination } from '@/models/pagination.model';
import { requestHandler } from '@/apis/https';

export const fetchBookReview = async (bookId: string) => {
  return await requestHandler<BookReviewItem[]>(
    'get',
    `/books/${bookId}/reviews`,
  );
};

interface AddBookReviewResponse {
  message: string;
  data: BookReviewItem;
}

export const addBookReview = async (
  bookId: string,
  data: BookReviewItemWrite,
) => {
  return await requestHandler<AddBookReviewResponse>(
    'post',
    `/books/${bookId}/reviews`,
    data,
  );
};

interface FetchReviewAllResponse {
  reviews: BookReviewItem[];
  pagination: Pagination;
}

export const fetchReviewAll = async () => {
  const response = await requestHandler<FetchReviewAllResponse>(
    'get',
    '/reviews',
  );
  return response.reviews;
};
