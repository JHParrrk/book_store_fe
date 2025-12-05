import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Title from "../components/commons/Title";
import BasketItem from "../components/basket/BasketItem";
import { useBasket } from "../hooks/useBasket";
import Empty from "../components/commons/Empty";
import { FaShoppingBasket } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BasketSummary from "../components/basket/BasketSummary";
import Button from "../components/commons/Button";
import { useAlert } from "../hooks/useAlert";

const Basket = () => {
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();
  const { baskets, isEmpty, deleteCartItem } = useBasket();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const totalQuantity = useMemo(() => {
    return baskets.reduce(
      (acc, basket) =>
        checkedItems.includes(basket.cart_id) ? acc + basket.quantity : acc,
      0
    );
  }, [baskets, checkedItems]);
  const totalPrice = useMemo(() => {
    return baskets.reduce(
      (acc, basket) =>
        checkedItems.includes(basket.cart_id)
          ? acc + parseFloat(basket.price.toString()) * basket.quantity
          : acc,
      0
    );
  }, [baskets, checkedItems]);

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };
  const handleDeleteItem = (cart_id: number) => {
    console.log("delete id:", cart_id);
    deleteCartItem(cart_id);
  };
  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert("주문할 상품을 선택해 주세요.");
      return;
    }

    const orderData = {
      items: checkedItems,
      totalPrice,
      totalQuantity,
      firstBookTitle: baskets.find(
        (basket) => basket.cart_id === checkedItems[0]
      )!.title,
    };

    showConfirm("주문하시겠습니까?", () => {
      navigate("/order", { state: orderData });
    });
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      {isEmpty ? (
        <Empty
          title="장바구니가 비었습니다."
          icon={<FaShoppingBasket />}
          description={<Link to="/books/search">장바구니를 채워보세요</Link>}
        />
      ) : (
        <BasketStyle>
          <div className="content">
            {baskets.map((basket) => (
              <BasketItem
                key={basket.cart_id}
                basket={basket}
                checkedItems={checkedItems}
                onCheck={handleCheckItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
          <div className="summary">
            <BasketSummary
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
            />
            <Button size="large" scheme="primary" onClick={handleOrder}>
              주문하기
            </Button>
          </div>
        </BasketStyle>
      )}
    </>
  );
};

export const BasketStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }

    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 24px 0;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 8px;
      position: relative;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }
  }

  .error-text {
    color: red;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 4px;
    right: 0;
    font-size: 12px;
  }
`;

export default Basket;
