import React, { useState } from "react";
import styled from "styled-components";
import Title from "../components/commons/Title";
import { useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import { BookDetail as IBookDetail } from "../models/book.model";
import { formatDate, formatNumber } from "../utils/format";
import { Link } from "react-router-dom";
import EllipsisBox from "../components/commons/EllipsisBox";
import LikeButton from "../components/book/LikeButton";
import AddToBasket from "../components/book/AddToBasket";
import BookReview from "../components/book/BookReview";
import { Tab, Tabs } from "../components/commons/Tabs";
import Modal from "../components/commons/Modal";

const bookInfoList = [
  {
    label: "카테고리",
    key: "category_name",
    filter: (book: IBookDetail) => {
      return (
        <Link to={`/books?category_Id=${book.category_id}`}>
          {book.category_name}
        </Link>
      );
    },
  },
  {
    label: "포맷",
    key: "form",
  },
  {
    label: "ISBN",
    key: "isbn",
  },
  {
    label: "출간일",
    key: "published_date",
    filter: (book: IBookDetail) => {
      return formatDate(book.published_date);
    },
  },
  {
    label: "가격",
    key: "price",
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)}원`;
    },
  },
  {
    label: "이쁘게 보기",
    key: "asdf",
  },
  {
    label: "용 나중에 ",
    key: "qwer",
  },
  {
    label: "스타일로",
    key: "zxcv",
  },
];

const BookDetail = () => {
  const { bookId } = useParams();
  const { book, likeToggle, reviews, addReview } = useBook(bookId);
  const [isImgOpen, setIsImgOpen] = useState(false);

  if (!book) return null;

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
          <img
            src={book.image_url}
            alt={book.title}
            onClick={() => setIsImgOpen(true)}
          />
        </div>
        <Modal isOpen={isImgOpen} onClose={() => setIsImgOpen(false)}>
          <img src={book.image_url} alt={book.title} />
        </Modal>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {bookInfoList.map((item) => (
            <dl key={item.key}>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(book)
                  : book[item.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>
          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className="add-cart">
            <AddToBasket book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="상세 설명">
            <Title size="medium">상세 설명</Title>
            <EllipsisBox linelimit={4}>{book.description}</EllipsisBox>
          </Tab>
          <Tab title="목차">
            <Title size="medium">목차</Title>
            <p className="index">{book.table_of_contents}</p>
          </Tab>
          <Tab title="리뷰">
            <Title size="medium">리뷰</Title>
            <BookReview reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
      </div>
    </BookDetailStyle>
  );
};

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;
  }

  .img {
    flex: 1;
    img {
      width: 100%;
      height: auto;
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;

    dl {
      display: flex;
      margin: 0;
      dt {
        width: 80px;
        color: ${({ theme }) => theme.color.secondary};
      }
      a {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }

  .content {
  }
`;

export default BookDetail;
