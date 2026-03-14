import { useEffect, useState } from 'react';
import {
  BookDetail,
  BookReviewItem,
  BookReviewItemWrite,
} from '@/features/book/types/book.model';
import { fetchBook, toggleLikeBook } from '@/features/book/api/books.api';
import { useAuthStore } from '@/stores/authStore';
import { useAlert } from '@/hooks/useAlert';
import { addCart } from '@/features/cart/api/carts.api';
import {
  addBookReview,
  deleteBookReview,
  fetchBookReview,
  updateBookReview,
} from '@/features/book/api/review.api';
import { useToast } from '@/hooks/useToast';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [basketAdded, setbasketAdded] = useState(false);
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const { isloggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const { showToast } = useToast();

  const likeToggle = () => {
    if (!isloggedIn) {
      showAlert('로그인이 필요합니다.');
      return;
    }

    if (!book) return;

    toggleLikeBook(book.id)
      .then(() => {
        // 서버로부터 최신 책 정보를 다시 가져와서 상태를 업데이트합니다.
        fetchBook(book.id.toString()).then((updatedBook: BookDetail) => {
          setBook(updatedBook);
          showToast(
            updatedBook.isLiked
              ? '좋아요가 반영되었습니다.'
              : '좋아요가 취소되었습니다.',
          );
        });
      })
      .catch(() => {
        showAlert('좋아요 처리 중 오류가 발생했습니다.');
      });
  };
  const addToBasket = (quantity: number) => {
    if (!book) return;

    addCart({
      items: [{ book_id: book.id, quantity: quantity }],
    }).then(() => {
      // showAlert("장바구니에 추가되었습니다.");
      setbasketAdded(true);
      setTimeout(() => {
        setbasketAdded(false);
      }, 3000);
    });
  };

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book: BookDetail) => {
      setBook(book);
    });

    fetchBookReview(bookId).then((reviews) => {
      setReviews(reviews);
    });
  }, [bookId]);

  const addReview = (data: BookReviewItemWrite) => {
    if (!book) return;

    addBookReview(book.id.toString(), data)
      .then((res) => {
        fetchBookReview(book.id.toString()).then((reviews) => {
          setReviews(reviews);
        });
        showAlert(res.message);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          showAlert('이미 해당 도서에 대한 리뷰를 작성하셨습니다.');
        } else {
          showAlert('리뷰 작성 중 오류가 발생했습니다.');
        }
      });
  };

  const updateReview = (reviewId: string, data: BookReviewItemWrite) => {
    if (!book) return;

    updateBookReview(book.id.toString(), reviewId, data).then((res) => {
      fetchBookReview(book.id.toString()).then((reviews) => {
        setReviews(reviews);
      });
      showAlert(res.message);
    });
  };

  const deleteReview = (reviewId: string) => {
    if (!book) return;

    deleteBookReview(book.id.toString(), reviewId).then(() => {
      fetchBookReview(book.id.toString()).then((reviews) => {
        setReviews(reviews);
      });
      showToast('리뷰가 삭제되었습니다.');
    });
  };

  return {
    book,
    likeToggle,
    basketAdded,
    addToBasket,
    reviews,
    addReview,
    updateReview,
    deleteReview,
  };
};
