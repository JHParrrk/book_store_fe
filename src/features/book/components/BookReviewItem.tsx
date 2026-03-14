import {
  BookReviewItemWrite,
  BookReviewItem as IBookReviewItem,
} from '@/features/book/types/book.model';
import { formatDate } from '@/utils/format';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useAuthStore } from '@/stores/authStore';
import { useForm } from 'react-hook-form';

interface Props {
  review: IBookReviewItem;
  onDelete?: () => void;
  onUpdate?: (data: BookReviewItemWrite) => void;
}

const BookReviewItem = ({ review, onDelete, onUpdate }: Props) => {
  const { isloggedIn, userId } = useAuthStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewItemWrite>({
    defaultValues: {
      content: review.content,
      rating: review.rating,
    },
  });

  const isAuthor = isloggedIn && userId === review.user_id;

  const handleDelete = () => {
    if (onDelete && window.confirm('정말 삭제하시겠습니까?')) {
      onDelete();
    }
  };

  const startEdit = () => {
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
  };

  const handleEditSubmit = async (data: BookReviewItemWrite) => {
    try {
      if (onUpdate) {
        await onUpdate(data);
      }
      setIsEditMode(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BookReviewItemStyle className={isEditMode ? 'editing' : ''}>
      {!isEditMode ? (
        <>
          <header className="header">
            <div>
              <span>{review.author_name}</span>
              <span className="star">
                {review.content?.length > 0
                  ? Array.from({ length: review.rating }, (_, i) => (
                      <FaStar key={i} />
                    ))
                  : review.rating + '점'}
              </span>
            </div>
            <div>
              {formatDate(review.created_at || '')}
              {isAuthor && (
                <div className="author-actions">
                  <button aria-label="수정" onClick={startEdit}>
                    <FaEdit />
                  </button>
                  <button
                    aria-label="삭제"
                    onClick={handleDelete}
                    className="delete-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          </header>
          <div className="content">
            <p>{review.content}</p>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(handleEditSubmit)}>
          <fieldset>
            <div className="edit-form-header">
              <span>{review.author_name}</span>
              <div className="edit-actions">
                <button type="submit" aria-label="저장">
                  <FaSave /> 저장
                </button>
                <button
                  type="button"
                  aria-label="취소"
                  onClick={cancelEdit}
                  className="cancel-btn"
                >
                  <FaTimes /> 취소
                </button>
              </div>
            </div>
            <div className="edit-form">
              <textarea
                {...register('content', { required: true })}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              ></textarea>
              {errors.content && (
                <p className="error-text">리뷰 내용을 입력해주세요.</p>
              )}
            </div>
            <div className="submit">
              <fieldset>
                <select
                  {...register('rating', {
                    required: true,
                    valueAsNumber: true,
                  })}
                >
                  <option value="1">1점</option>
                  <option value="2">2점</option>
                  <option value="3">3점</option>
                  <option value="4">4점</option>
                  <option value="5">5점</option>
                </select>
              </fieldset>
            </div>
          </fieldset>
        </form>
      )}
    </BookReviewItemStyle>
  );
};

const BookReviewItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  &.editing {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
    }

    .edit-form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      span {
        font-weight: bold;
      }
    }

    .edit-actions {
      display: flex;
      gap: 8px;

      button {
        display: flex;
        align-items: center;
        gap: 4px;
        background: transparent;
        border: none;
        color: ${({ theme }) => theme.color.primary};
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;

        &:hover {
          background-color: ${({ theme }) => theme.color.background};
        }

        &.cancel-btn {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }

    .edit-form {
      textarea {
        width: 100%;
        min-height: 60px;
        resize: none;
        overflow: hidden;
        margin-bottom: 8px;
        padding: 12px;
        background-color: ${({ theme }) =>
          theme.name === 'dark' ? '#111' : '#fff'};
        color: ${({ theme }) => (theme.name === 'dark' ? '#fff' : '#000')};
        border: 1px solid ${({ theme }) => theme.color.border};
        border-radius: ${({ theme }) => theme.borderRadius.default};
      }
    }

    .submit {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      select {
        padding: 4px 8px;
        border-radius: ${({ theme }) => theme.borderRadius.default};
        border: 1px solid ${({ theme }) => theme.color.border};
        background-color: ${({ theme }) =>
          theme.name === 'dark' ? '#111' : '#fff'};
        color: ${({ theme }) => (theme.name === 'dark' ? '#fff' : '#000')};
      }
    }

    .error-text {
      color: red;
      font-size: 0.875rem;
      margin: 0;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.secondary};
    padding: 0;

    .star {
      padding: 0 0 0 8px;
      svg {
        fill: ${({ theme }) => theme.color.primary};
      }
    }

    .author-actions {
      display: inline-flex;
      margin-left: 12px;
      gap: 8px;

      button {
        background: transparent;
        border: none;
        cursor: pointer;
        color: ${({ theme }) => theme.color.secondary};
        padding: 0;

        &:hover {
          color: ${({ theme }) => theme.color.primary};
        }

        &.delete-btn:hover {
          color: red;
        }
      }
    }
  }

  .content {
    p {
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;
    }
  }
`;

export default BookReviewItem;
