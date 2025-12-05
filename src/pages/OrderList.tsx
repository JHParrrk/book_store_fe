import React from "react";
import styled from "styled-components";
import Title from "../components/commons/Title";
import { useOrders } from "../hooks/useOrders";
import { formatDate, formatNumber } from "../utils/format";
import Button from "../components/commons/Button";

const OrderList = () => {
  const { orders, selectedItemId, selectOrderItem } = useOrders();

  return (
    <>
      <Title size="large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>금액</th>
              <th>상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.order_id}>
                <tr>
                  <td>{order.order_id}</td>
                  <td>{formatDate(order.created_at, "YYYY.MM.DD")}</td>
                  <td>{formatNumber(order.total_price)}원</td>
                  <td>{order.status}</td>
                  <td>
                    <Button
                      size="small"
                      scheme="normal"
                      onClick={() => selectOrderItem(order.order_id)}
                    >
                      자세히
                    </Button>
                  </td>
                </tr>
                {selectedItemId === order.order_id && (
                  <tr>
                    <td></td>
                    <td colSpan={5}>
                      <ul className="detail">
                        {order.detail &&
                          order.detail.books.map((item) => (
                            <li key={item.book_id}>
                              <div>
                                <span>{item.title}</span>
                                <span>{item.quantity}권</span>
                                <span>{formatNumber(item.price)}원</span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
};

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }

    .detail {
      margin: 0;
      li {
        list-style: square;
        text-align: left;
        div {
          display: flex;
          padding: 8px 12px;
          gap: 12px;
        }
      }
    }
  }
`;

export default OrderList;
