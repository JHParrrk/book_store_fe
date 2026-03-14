import React, { useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Button from '@/components/commons/Button';

const BookSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);

    if (keyword.trim()) {
      newSearchParams.set('keyword', keyword.trim());
    } else {
      newSearchParams.delete('keyword');
    }

    // 검색 시 페이지를 1로 리셋
    newSearchParams.delete('page');

    setSearchParams(newSearchParams);
  };

  return (
    <SearchStyle onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="제목, 저자, 책 설명 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button size="medium" scheme="primary" type="submit">
        검색
      </Button>
    </SearchStyle>
  );
};

const SearchStyle = styled.form`
  display: flex;
  gap: 8px;
  align-items: center;

  input {
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    font-size: 1rem;
    width: 250px;
    outline: none;
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) =>
      theme.name === 'dark' ? '#111' : '#fff'};

    &:focus {
      border-color: ${({ theme }) => theme.color.primary};
    }
  }
`;

export default BookSearch;
