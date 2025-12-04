import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../commons/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/queryString";

const viewOptions = [
  {
    value: "list",
    icon: <FaList />,
  },
  {
    value: "grid",
    icon: <FaTh />,
  },
];

export type ViewMode = "grid" | "list";

const BooksViewSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    // 기존 view 파라미터 삭제
    newSearchParams.delete(QUERYSTRING.VIEW);

    // 새로운 view 파라미터를 마지막에 추가
    newSearchParams.append(QUERYSTRING.VIEW, value);

    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.append(QUERYSTRING.VIEW, "grid");
      setSearchParams(newSearchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((option) => (
        <Button
          key={option.value}
          size="medium"
          scheme={
            searchParams.get(QUERYSTRING.VIEW) === option.value
              ? "primary"
              : "normal"
          }
          onClick={() => handleSwitch(option.value as ViewMode)}
        >
          {option.icon}
        </Button>
      ))}
    </BooksViewSwitcherStyle>
  );
};

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
  svg {
    fill: white;
  }
`;
export default BooksViewSwitcher;
