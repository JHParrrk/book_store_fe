import { useLocation } from 'react-router-dom';
import { fetchBooks } from '@/features/book/api/books.api';
import { QUERYSTRING } from '@/constants/queryString';
import { LIMIT } from '@/constants/pagination';
import { useQuery } from '@tanstack/react-query';

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
  const isBest = params.get('best') === 'true'; // Î≤†Ïä§???Ä???¨Î? ?ïÏù∏

  const { data: booksData, isLoading: isBooksLoading } = useQuery<BooksData>({
    queryKey: ['books', location.search, isBest],
    queryFn: async () => {
      // ?éØ Î≤†Ïä§?∏Ï????òÏù¥ÏßÄ??Í≤ΩÏö∞
      if (isBest) {
        // fetchBestBooks ?ÑÌè¨???ÑÏöî??
        // ?ôÏ†Å?ºÎ°ú ?ÑÌè¨?∏ÌïòÍ±∞ÎÇò ?ÅÎã®??Ï∂îÍ?: import { fetchBestBooks } from "@/features/book/api/books.api";
        const { fetchBestBooks } =
          await import('@/features/book/api/books.api');
        const bestBooks = await fetchBestBooks();
        return {
          books: bestBooks || [],
          pagination: {
            totalCount: bestBooks?.length || 0,
            currentPage: 1,
            totalPages: 1,
          },
        };
      }

      // Í∏∞Î≥∏ Í≤Ä??Î°úÏßÅ
      const response = await fetchBooks({
        category_Id: params.get(QUERYSTRING.CATEGORY_ID)
          ? Number(params.get(QUERYSTRING.CATEGORY_ID))
          : undefined,
        isNew: params.get(QUERYSTRING.ISNEW) ? true : undefined,
        currentPage: params.get(QUERYSTRING.PAGE)
          ? Number(params.get(QUERYSTRING.PAGE))
          : 1,
        limit: LIMIT,
        keyword: params.get('keyword') || undefined,
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
    staleTime: 1000 * 60 * 5, // 5Î∂?
    refetchOnWindowFocus: false,
  });

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books?.length === 0,
    isBooksLoading,
  };
};


