import { BookReviewItemWrite } from "../../models/book.model";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../commons/Button";

interface Props {
  onAdd: (data: BookReviewItemWrite) => void;
}

const BookReviewAdd = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewItemWrite>();

  const handleFormSubmit = (data: BookReviewItemWrite) => {
    // rating을 숫자로 변환
    const formattedData = {
      ...data,
      rating: Number(data.rating) || 1,
    };
    onAdd(formattedData);
  };

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <fieldset>
          <textarea {...register("content", { required: true })}></textarea>
          {errors.content && (
            <p className="error-text">리뷰 내용을 입력해주세요</p>
          )}
        </fieldset>
        <div className="submit">
          <fieldset className="rating-fieldset">
            <label htmlFor="rating" className="rating-label">
              평점을 선택해주세요:
            </label>
            <select
              id="rating"
              className="rating-select"
              {...register("rating", { required: true })}
            >
              <option value="1">1점</option>
              <option value="2">2점</option>
              <option value="3">3점</option>
              <option value="4">4점</option>
              <option value="5">5점</option>
            </select>
          </fieldset>
          <Button type="submit" size="medium" scheme="primary">
            작성하기
          </Button>
        </div>
      </form>
    </BookReviewAddStyle>
  );
};

const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: end;

      .error-text {
        color: red;
        padding: 0;
        margin: 0;
      }
    }

    textarea {
      width: 100%;
      height: 100px;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      border: 1px solid ${({ theme }) => theme.color.border};
      padding: 12px;
    }
  }

  .submit {
    display: flex;
    justify-content: end;
  }
`;

export default BookReviewAdd;
