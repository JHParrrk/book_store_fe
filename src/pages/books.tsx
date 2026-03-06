import React, { useEffect } from "react";
import styled from "styled-components";
import Title from "@/components/commons/Title";
import BooksFilter from "@/features/books/components/BooksFilter";
import BooksList from "@/features/books/components/BooksList";
import BooksEmpty from "@/features/books/components/BooksEmpty";
import Pagination from "@/features/books/components/Pagination";
import BooksViewSwitcher from "@/features/books/components/BooksViewSwitcher";
import { useBooks } from "@/features/books/hooks/useBooks";
import Loading from "@/components/commons/Loading";

const Books = () => {
  const { books, pagination, isEmpty, isBooksLoading } = useBooks();

  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        {isEmpty && <BooksEmpty />}
        <BooksList books={books} />
        <Pagination pagination={pagination} />
      </BooksStyle>
    </>
  );
};

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
`;

export default Books;
