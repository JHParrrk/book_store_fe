import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Title from '@/components/commons/Title';
import Button from '@/components/commons/Button';
import InputText from '@/components/commons/inputText';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/stores/authStore';
import {
  getMyUserInfo,
  updateUserInfo,
  getMyReviews,
} from '@/features/auth/api/auth.api';
import { useAlert } from '@/hooks/useAlert';
import Loading from '@/components/commons/Loading';
import BookReviewItem from '@/features/book/components/BookReviewItem';
import { formatDate } from '@/utils/format';

interface UserFormData {
  name: string;
  address: string;
  phone_number: string;
  password?: string;
}

const MyPage = () => {
  const { userId } = useAuthStore();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>();

  useEffect(() => {
    if (!userId) return;

    const fetchMyPageData = async () => {
      try {
        const userInfoRes = await getMyUserInfo();
        const user = userInfoRes.user || userInfoRes;

        setValue('name', user.name || '');
        setValue('address', user.address || '');
        setValue('phone_number', user.phone_number || '');

        fetchReviews(1);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPageData();
  }, [userId, setValue]);

  const fetchReviews = async (page: number) => {
    try {
      const res = await getMyReviews(page, 5);
      setReviews(res.reviews || []);
      setPagination(res.pagination || { currentPage: 1, totalPages: 1 });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    if (!userId) return;

    try {
      const payload: any = {
        name: data.name,
        address: data.address,
        phone_number: data.phone_number,
      };
      if (data.password) {
        payload.password = data.password;
      }

      await updateUserInfo(userId, payload);
      showAlert('회원 정보가 성공적으로 수정되었습니다.');
    } catch (err) {
      showAlert('회원 정보 수정에 실패했습니다.');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <MyPageStyle>
      <Title size="large">마이페이지</Title>

      <section className="section">
        <Title size="medium">내 정보 수정</Title>
        <form className="user-info-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>이름</label>
            <InputText
              inputType="text"
              {...register('name', { required: '이름을 입력해주세요' })}
            />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>비밀번호 (변경시에만 입력)</label>
            <InputText inputType="password" {...register('password')} />
          </div>
          <div className="form-group">
            <label>연락처</label>
            <InputText inputType="text" {...register('phone_number')} />
          </div>
          <div className="form-group">
            <label>주소</label>
            <InputText inputType="text" {...register('address')} />
          </div>
          <div className="actions">
            <Button size="medium" scheme="primary" type="submit">
              수정하기
            </Button>
          </div>
        </form>
      </section>

      <section className="section">
        <Title size="medium">내가 쓴 리뷰</Title>
        {reviews.length === 0 ? (
          <p className="empty-reviews">작성한 리뷰가 없습니다.</p>
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <BookReviewItem review={review} />
              </div>
            ))}
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: pagination.totalPages }).map((_, i) => (
              <button
                key={i + 1}
                className={pagination.currentPage === i + 1 ? 'active' : ''}
                onClick={() => fetchReviews(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </MyPageStyle>
  );
};

const MyPageStyle = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .section {
    background-color: ${({ theme }) => theme.color.background_light};
    padding: 32px;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    border: 1px solid ${({ theme }) => theme.color.border};
  }

  .user-info-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
    max-width: 400px;

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        font-weight: 600;
        font-size: 0.95rem;
      }

      .error {
        color: coral;
        font-size: 0.8125rem;
      }
    }

    .actions {
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
    }
  }

  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;

    .review-card {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .review-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 8px;
        border-bottom: 1px solid ${({ theme }) => theme.color.border};

        strong {
          color: ${({ theme }) => theme.color.primary};
          font-size: 1.1rem;
        }

        .date {
          color: ${({ theme }) => theme.color.secondary};
          font-size: 0.875rem;
        }
      }
    }
  }

  .empty-reviews {
    margin-top: 24px;
    color: ${({ theme }) => theme.color.secondary};
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;

    button {
      background: none;
      border: 1px solid ${({ theme }) => theme.color.border};
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;

      &.active {
        background-color: ${({ theme }) => theme.color.primary};
        color: white;
        border-color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;

export default MyPage;
