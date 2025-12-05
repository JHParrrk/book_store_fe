import React, { useMemo } from "react";
import styled from "styled-components";
import { Cart } from "../../models/cart.model";
import Button from "../commons/Button";
import Title from "../commons/Title";
import { formatNumber } from "../../utils/format";
import CheckIconButton from "./CheckIconButton";
import { useAlert } from "../../hooks/useAlert";

interface Props {
  basket: Cart;
  checkedItems: number[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

const BasketItem = ({ basket, checkedItems, onCheck, onDelete }: Props) => {
  const { showConfirm } = useAlert();
  const isChecked = useMemo(() => {
    return checkedItems.includes(basket.cart_id);
  }, [checkedItems, basket.cart_id]);

  const handleCheck = () => {
    onCheck(basket.cart_id);
  };
  const handleDelete = () => {
    showConfirm("삭제하시겠습니까?", () => {
      onDelete(basket.cart_id);
    });
  };

  return (
    <BasketItemStyle>
      <div className="info">
        <div className="check">
          <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
        </div>
        <div>
          <Title size="medium" color="text">
            {basket.title}
          </Title>
          <p className="price">{formatNumber(basket.price)}원</p>
          <p className="quantity">{basket.quantity}권</p>
        </div>
      </div>
      <Button size="medium" scheme="normal" onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </BasketItemStyle>
  );
};

const BasketItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;

  .check {
    width: 40px;
    flex-shrink: 0;
  }

  .info {
    display: flex;
    align-items: start;
    flex: 1;

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default BasketItem;
