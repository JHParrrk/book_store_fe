import React, { useState } from 'react';
import styled from 'styled-components';
import { Book } from '@/features/book/types/book.model';
// import { getImgSrc } from "@/utils/image";
import { formatNumber } from '@/utils/format';
import { FaHeart } from 'react-icons/fa';
import { ViewMode } from '@/features/book/components/BooksViewSwitcher';
import { Link } from 'react-router-dom';

interface Props {
  book: Book;
  view?: ViewMode;
}

const BookItem = ({ book, view }: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <BookItemStyle view={view}>
      <Link to={`/books/${book.id}`}>
        <div className={`img ${imgLoaded ? 'loaded' : 'loading'}`}>
          <img
            src={book.image_url}
            alt={book.title}
            onLoad={() => setImgLoaded(true)}
          />
        </div>
        <div className="content">
          <h2 className="title">{book.title}</h2>
          <p className="summary">{book.summary}</p>
          <p className="author">{book.author}</p>
          <p className="price">{formatNumber(book.price)}원</p>
          <div className="likes">
            <FaHeart />
            <span>{book.likes}</span>
          </div>
        </div>
      </Link>
    </BookItemStyle>
  );
};

export const BookItemStyle = styled.div<Pick<Props, 'view'>>`
  height: 100%;
  a {
    display: flex;
    flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    border: 1px solid
      ${({ theme }) =>
        theme.name === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
    text-decoration: none;
    height: 100%;
    background-color: ${({ theme }) => theme.color.background_light};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      border-color: ${({ theme }) =>
        theme.name === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'transparent'};
    }
  }

  .img {
    position: relative;
    overflow: hidden;
    width: ${({ view }) => (view === 'grid' ? 'auto' : '160px')};
    aspect-ratio: ${({ view }) => (view === 'grid' ? '3 / 4' : 'unset')};
    min-height: ${({ view }) => (view === 'grid' ? 'auto' : '220px')};
    background-color: ${({ theme }) => theme.color.border};
    flex-shrink: 0;

    &.loading::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: loading-skeleton 1.5s infinite;
    }

    img {
      max-width: 100%;
      height: 100%;
      width: 100%;
      object-fit: cover;
      display: block;
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    &.loading img {
      opacity: 0;
    }
  }

  @keyframes loading-skeleton {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .content {
    padding: 16px;
    padding-bottom: 56px; /* leaves room for absolute likes */
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 12px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${({ theme }) => theme.color.text}; /* Adjusted for dark mode */
    }
    .summary {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.text}; /* Adjusted for dark mode */
      margin: 0 0 4px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .author {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }
    .price {
      font-size: 1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.color.text}; /* Adjusted for dark mode */
      margin: 0 0 4px 0;
      margin-top: auto; /* Pushes the price and below to the bottom */
    }
    .likes {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      font-weight: 700;
      color: ${({ theme }) => theme.color.primary};
      margin: 0 0 4px 0;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 4px 12px;
      position: absolute;
      bottom: 16px;
      right: 16px;

      svg : {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;

export default BookItem;
