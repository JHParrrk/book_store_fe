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
    const newSearchParams = new URLSearchParams(searchParams);

    if (id === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    setSearchParams(newSearchParams);
  };
  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(QUERYSTRING.ISNEW)) {
      newSearchParams.delete(QUERYSTRING.ISNEW);
    } else {
      newSearchParams.set(QUERYSTRING.ISNEW, "true");
    }
    setSearchParams(newSearchParams);
  };

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button
            size="medium"
            scheme={
              searchParams.get(QUERYSTRING.CATEGORY_ID) === item.id?.toString()
                ? "primary"
                : "normal"
            }
            key={item.id}
            onClick={() => handleCategory(item.id)}
          >
            {item.name}
          </Button>
        ))}
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
  }
`;
export default BooksFilter;
