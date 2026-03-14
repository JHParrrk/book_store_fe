import { Book, BookDetail } from '@/features/book/types/book.model';
import { Pagination } from '@/models/pagination.model';
import { httpClient } from '@/apis/https';

interface FetchBooksParams {
  category_Id?: number;
  isNew?: boolean;
  currentPage?: number;
  limit: number;
  keyword?: string;
}

export interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    // `page`ë¥?`currentPage`ë¡?ë³€??
    const { currentPage, isNew, category_Id, limit, keyword } = params;
    const queryParams = {
      category_id: category_Id,
      isNew,
      page: currentPage,
      limit,
      keyword,
    };

    const response = await httpClient.get<FetchBooksResponse>('/books/search', {
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

// ?œë²„ê°€ ? ê? ë¡œì§??ì²˜ë¦¬?˜ëŠ” ê²½ìš°(?”ì²­ë§?ë³´ë‚´ë©??´ë‹¹ ? ì???ì¢‹ì•„???íƒœë¥?? ê???
export const toggleLikeBook = async (bookId: number) => {
  return await httpClient.post<{ isLiked: boolean }>(`/books/${bookId}/like`);
};

export const fetchBestBooks = async () => {
  const response = await httpClient.get<{ books: Book[] }>(`/books/best`);

  return response.data.books;
};

