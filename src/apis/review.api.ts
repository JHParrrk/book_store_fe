import { BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { requestHandler } from "./https";

export const fetchBookReview = async (bookId: string) => {
  return await requestHandler<BookReviewItem[]>(
    "get",
    `/books/${bookId}/reviews`
  );
};

interface AddBookReviewResponse {
  message: string;
  data: BookReviewItem;
}

export const addBookReview = async (
  bookId: string,
  data: BookReviewItemWrite
) => {
  return await requestHandler<AddBookReviewResponse>(
    "post",
    `/books/${bookId}/reviews`,
    data
  );
};

export const fetchReviewAll = async () => {
  return await requestHandler<BookReviewItem[]>("get", "/reviews");
};
