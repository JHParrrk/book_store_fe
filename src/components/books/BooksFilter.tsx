import React from "react";
import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../commons/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/queryString";

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
      newSearchParams.set(QUERYSTRING.ISNEW, "true");
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
        {mainCategories.map((item) => {
          const subCategories = category.filter(
            (sub) => sub.parent_id === item.id
          );

          return (
            <div className="category-group" key={item.id}>
              <Button
                size="medium"
                scheme={
                  currentCategoryId ===
                  (item.id === null ? null : item.id?.toString())
                    ? "primary"
                    : "normal"
                }
                onClick={() => handleCategory(item.id)}
              >
                {item.name}
              </Button>

              {subCategories.length > 0 && (
                <div className="sub-categories">
                  {subCategories.map((sub) => (
                    <React.Fragment key={sub.id}>
                      <Button
                        size="medium"
                        scheme={
                          currentCategoryId === sub.id?.toString()
                            ? "primary"
                            : "normal"
                        }
                        onClick={() => handleCategory(sub.id)}
                      >
                        {sub.name}
                      </Button>
                      {category
                        .filter((sub3) => sub3.parent_id === sub.id)
                        .map((sub3) => (
                          <Button
                            key={sub3.id}
                            size="small"
                            scheme={
                              currentCategoryId === sub3.id?.toString()
                                ? "primary"
                                : "normal"
                            }
                            onClick={() => handleCategory(sub3.id)}
                            style={{ marginLeft: "10px" }}
                          >
                            {sub3.name}
                          </Button>
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
          scheme={searchParams.get(QUERYSTRING.ISNEW) ? "primary" : "normal"}
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
        top: 100%;
        left: 0;
        background-color: #fff;
        border: 1px solid ${({ theme }) => theme.color.border};
        border-radius: 4px;
        padding: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 100;
        min-width: 200px;
        flex-direction: column;
        gap: 8px;
      }

      &:hover .sub-categories {
        display: flex;
      }
    }
  }
`;
export default BooksFilter;
