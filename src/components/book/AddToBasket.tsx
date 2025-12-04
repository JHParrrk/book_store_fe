import React, { useState } from "react";
import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import InputText from "../commons/inputText";
import Button from "../commons/Button";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface Props {
  book: BookDetail;
}

const AddToBasket = ({ book }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { basketAdded, addToBasket } = useBook(book.id.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <AddToBasketStyle $added={basketAdded}>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
        />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button
        size="medium"
        scheme="primary"
        onClick={() => addToBasket(quantity)}
      >
        장바구니 담기
      </Button>
      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to="/basket">장바구니로 이동</Link>
      </div>
    </AddToBasketStyle>
  );
};

interface AddToBasketStyleProps {
  $added: boolean;
}

const AddToBasketStyle = styled.div<AddToBasketStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? "1" : "0")};
    transition: all 0.5s ease;

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default AddToBasket;
