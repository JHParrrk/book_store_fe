import { useLocation } from "react-router-dom";
import { fetchBooks } from "../apis/books.api";
import { QUERYSTRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "@tanstack/react-query";

interface BooksData {
  books: any[];
  pagination: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
}

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { data: booksData, isLoading: isBooksLoading } = useQuery<BooksData>({
    queryKey: ["books", location.search],
    queryFn: async () => {
      const response = await fetchBooks({
        categoryId: params.get(QUERYSTRING.CATEGORY_ID)
          ? Number(params.get(QUERYSTRING.CATEGORY_ID))
          : undefined,
        isNew: params.get(QUERYSTRING.ISNEW) ? true : undefined,
        currentPage: params.get(QUERYSTRING.PAGE)
          ? Number(params.get(QUERYSTRING.PAGE))
          : 1,
        limit: LIMIT,
      });

      return {
        books: response.books || [],
        pagination: {
          totalCount: response.pagination?.totalCount || 0,
          currentPage: response.pagination?.currentPage || 1,
          totalPages: response.pagination?.totalPages || 1,
        },
      };
    },
  });

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books?.length === 0,
    isBooksLoading,
  };
};
