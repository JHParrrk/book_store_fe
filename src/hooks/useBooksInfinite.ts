import { useLocation } from "react-router-dom";
import { fetchBooks } from "../apis/books.api";
import { QUERYSTRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBooksInfinite = () => {
  const location = useLocation();
  const getBooks = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search);
    const category_Id = params.get(QUERYSTRING.CATEGORY_ID)
      ? Number(params.get(QUERYSTRING.CATEGORY_ID))
      : undefined;
    const isNew = params.get(QUERYSTRING.ISNEW) ? true : undefined;
    const limit = LIMIT;
    const currentPage = pageParam;

    return fetchBooks({
      category_Id,
      isNew,
      limit,
      currentPage,
    });
  };
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["books", location.search],
    queryFn: ({ pageParam }) => getBooks({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const isLastPage =
        lastPage.pagination.totalPages === lastPage.pagination.currentPage;

      return isLastPage ? null : lastPage.pagination.currentPage + 1;
    },
  });
  const books = data ? data.pages.flatMap((page) => page.books) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
  const isEmpty = books.length === 0;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isLoading,
    fetchNextPage,
    hasNextPage,
  };
};
