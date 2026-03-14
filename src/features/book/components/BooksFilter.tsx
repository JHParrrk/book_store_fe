import React from 'react';
import styled from 'styled-components';
import { useCategory } from '@/features/book/hooks/useCategory';
import Button from '@/components/commons/Button';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '@/constants/queryString';

const BooksFilter = () => {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams();

    if (id !== null) {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    const isNew = searchParams.get(QUERYSTRING.ISNEW);
    if (isNew) {
      newSearchParams.set(QUERYSTRING.ISNEW, isNew);
    }

    const view = searchParams.get(QUERYSTRING.VIEW);
    if (view) {
      newSearchParams.set(QUERYSTRING.VIEW, view);
    }

    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams();
    const categoryId = searchParams.get(QUERYSTRING.CATEGORY_ID);
    if (categoryId) {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, categoryId);
    }

    if (!searchParams.get(QUERYSTRING.ISNEW)) {
      newSearchParams.set(QUERYSTRING.ISNEW, 'true');
    }

    const view = searchParams.get(QUERYSTRING.VIEW);
    if (view) {
      newSearchParams.set(QUERYSTRING.VIEW, view);
    }

    setSearchParams(newSearchParams);
  };

  const mainCategories = category.filter((item) => item.parent_id === null);
  const currentCategoryId = searchParams.get(QUERYSTRING.CATEGORY_ID);

  return (
    <BooksFilterStyle>
      <div className="category">
        <Button
          size="medium"
          scheme={currentCategoryId === null ? 'primary' : 'normal'}
          onClick={() => handleCategory(null)}
        >
          전체
        </Button>

        {mainCategories.map((item) => {
          const subCategories = category.filter(
            (sub) => sub.parent_id === item.id,
          );

          return (
            <div className="category-group" key={item.id}>
              <Button
                size="medium"
                scheme={
                  currentCategoryId ===
                  (item.id === null ? null : item.id?.toString())
                    ? 'primary'
                    : 'normal'
                }
                onClick={() => handleCategory(item.id)}
              >
                {item.name}
              </Button>

              {subCategories.length > 0 && (
                <div className="sub-categories">
                  {subCategories.map((sub) => (
                    <React.Fragment key={sub.id}>
                      <button
                        className={`dropdown-item ${currentCategoryId === sub.id?.toString() ? 'active' : ''}`}
                        onClick={() => handleCategory(sub.id)}
                      >
                        {sub.name}
                      </button>
                      {category
                        .filter((sub3) => sub3.parent_id === sub.id)
                        .map((sub3) => (
                          <button
                            key={sub3.id}
                            className={`dropdown-item sub-item ${currentCategoryId === sub3.id?.toString() ? 'active' : ''}`}
                            onClick={() => handleCategory(sub3.id)}
                          >
                            └ {sub3.name}
                          </button>
                        ))}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="new">
        <Button
          size="medium"
          scheme={searchParams.get(QUERYSTRING.ISNEW) ? 'primary' : 'normal'}
          onClick={handleNews}
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
};

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .category-group {
      position: relative;

      .sub-categories {
        display: none;
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        background-color: ${({ theme }) => theme.color.background_light};
        border: 1px solid ${({ theme }) => theme.color.border};
        border-radius: ${({ theme }) => theme.borderRadius.default};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 100;
        min-width: 180px;
        flex-direction: column;
        padding: 8px 0;
        overflow: hidden;

        .dropdown-item {
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          padding: 10px 16px;
          font-size: 0.95rem;
          color: ${({ theme }) => theme.color.text};
          cursor: pointer;
          transition:
            background-color 0.2s,
            color 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.color.background};
            color: ${({ theme }) => theme.color.primary};
          }

          &.active {
            color: ${({ theme }) => theme.color.primary};
            font-weight: 700;
            background-color: ${({ theme }) => theme.color.background};
          }

          &.sub-item {
            padding-left: 28px;
            font-size: 0.9rem;
            color: ${({ theme }) => theme.color.secondary};
            display: flex;
            align-items: center;
            gap: 4px;

            &::before {
              content: '';
            }
          }
        }
      }

      &:hover .sub-categories {
        display: flex;
      }
    }
  }
`;
export default BooksFilter;
