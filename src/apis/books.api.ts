import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./https";

interface FetchBooksParams {
  category_Id?: number;
  isNew?: boolean;
  currentPage?: number;
  limit: number;
}

export interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    // `page`를 `currentPage`로 변환
    const { currentPage, isNew, category_Id, limit } = params;
    const queryParams = {
      category_id: category_Id,
      isNew,
      page: currentPage,
      limit,
    };

    const response = await httpClient.get<FetchBooksResponse>("/books/search", {
      params: queryParams,
    });

    return response.data;
  } catch (err) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);

  return response.data;
};

// 서버가 토글 로직을 처리하는 경우(요청만 보내면 해당 유저의 좋아요 상태를 토글함)
export const toggleLikeBook = async (bookId: number) => {
  return await httpClient.post<{ isLiked: boolean }>(`/books/${bookId}/like`);
};

export const fetchBestBooks = async () => {
  const response = await httpClient.get<Book[]>(`/books/best`);

  return response.data;
};
