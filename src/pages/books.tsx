import React, { useEffect } from 'react';
import styled from 'styled-components';
import Title from '@/components/commons/Title';
import BooksFilter from '@/features/book/components/BooksFilter';
import BooksList from '@/features/book/components/BooksList';
import BooksEmpty from '@/features/book/components/BooksEmpty';
import Pagination from '@/features/book/components/Pagination';
import BooksViewSwitcher from '@/features/book/components/BooksViewSwitcher';
import BookSearch from '@/features/book/components/BookSearch';
import { useBooks } from '@/features/book/hooks/useBooks';
import Loading from '@/components/commons/Loading';
import { useLocation } from 'react-router-dom';

const Books = () => {
  const { books, pagination, isEmpty, isBooksLoading } = useBooks();
  const location = useLocation();
  const isBest = new URLSearchParams(location.search).get('best') === 'true';

  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size="large">{isBest ? '베스트 도서' : '도서 검색 결과'}</Title>
      <BooksStyle>
        {!isBest && (
          <div className="search-container">
            <BookSearch />
          </div>
        )}
        <div className="filter">
          {!isBest && <BooksFilter />}
          <BooksViewSwitcher />
        </div>
        {isEmpty && <BooksEmpty />}
        <BooksList books={books} />
        {!isBest && <Pagination pagination={pagination} />}
      </BooksStyle>
    </>
  );
};

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .search-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .filter {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
`;

export default Books;
