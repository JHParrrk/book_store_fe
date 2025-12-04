import React from "react";
import styled from "styled-components";
import { Pagination as IPagination } from "../../models/pagination.model";
import Button from "../commons/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/queryString";

interface Props {
  pagination: IPagination;
}

const Pagination = ({ pagination }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalPages, currentPage } = pagination;

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    // 기존 view 파라미터를 삭제 후 다시 추가하여 항상 마지막에 위치하도록 설정
    const view = newSearchParams.get(QUERYSTRING.VIEW);
    if (view) {
      newSearchParams.delete(QUERYSTRING.VIEW);
    }

    newSearchParams.set(QUERYSTRING.PAGE, page.toString());

    if (view) {
      newSearchParams.append(QUERYSTRING.VIEW, view);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <PaginationStyle>
      {totalPages > 0 && (
        <ol>
          {Array(totalPages)
            .fill(0)
            .map((_, i) => (
              <li key={i}>
                <Button
                  size="small"
                  scheme={currentPage === i + 1 ? "primary" : "normal"}
                  onClick={() => handleClickPage(i + 1)}
                >
                  {i + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PaginationStyle>
  );
};

const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px 0;

  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;
export default Pagination;
