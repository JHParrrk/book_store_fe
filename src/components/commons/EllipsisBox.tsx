import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  linelimit: number;
}

const EllipsisBox = ({ children, linelimit }: Props) => {
  const [expended, setExpended] = useState(false);

  return (
    <EllipsisBoxStyle linelimit={linelimit} $expended={expended}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size="small"
          scheme="normal"
          onClick={() => setExpended(!expended)}
        >
          {expended ? "접기" : "펼치기"}
          <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
};

interface EllipsisBoxStyleProps {
  linelimit: number;
  $expended: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ linelimit, $expended }) =>
      $expended ? "none" : linelimit};
    -webkit-box-orient: vertical;
    padding: 20px 0 0;
    margin: 0;
  }

  .toggle {
    display: flex;
    justify-content: end;
    svg {
      transform: ${({ $expended }) =>
        $expended ? "rotate(180deg)" : "rotate(0)"};
    }
  }
`;

export default EllipsisBox;
