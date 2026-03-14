import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  fetchOrder,
  cancelOrder,
  payOrder,
} from '@/features/order/api/order.api';
import { OrderDetail as OrderDetailType } from '@/features/order/types/order.model';
import Title from '@/components/commons/Title';
import Button from '@/components/commons/Button';
import { formatNumber } from '@/utils/format';
import { useAlert } from '@/hooks/useAlert';

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [order, setOrder] = useState<OrderDetailType | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');

  const loadOrder = async () => {
    if (!orderId) return;
    try {
      const data = await fetchOrder(Number(orderId));
      setOrder(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  useEffect(() => {
    if (order && order.status !== '결제대기' && order.status !== '주문취소') {
      const interval = setInterval(() => {
        loadOrder();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [order?.status]);

  const handleCancel = async () => {
    if (!orderId) return;
    if (window.confirm('정말 취소하시겠습니까?')) {
      try {
        await cancelOrder(Number(orderId));
        showAlert('주문이 취소되었습니다.');
        navigate('/orderlist');
      } catch (err) {
        showAlert('취소 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handlePayment = async () => {
    if (!orderId) return;
    try {
      await payOrder(Number(orderId), { cardNumber, cvv });
      setShowPaymentModal(false);
      navigate(`/orderlist/${orderId}/complete`);
    } catch (err: any) {
      const status = err.response?.status || err.status;
      if (status === 402) {
        showAlert('한도초과');
      } else if (status === 400) {
        showAlert('비정상카드');
      } else if (status === 500) {
        showAlert('시스템에러');
      } else {
        showAlert('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  if (!order) return null;

  return (
    <Container>
      <Title size="large">주문 상세 내역</Title>

      <StatusSection>
        <div className="label">현재 주문 상태</div>
        <div className="status">{order.status}</div>
      </StatusSection>

      {order.status === '결제대기' && (
        <ActionSection>
          <Button size="medium" scheme="normal" onClick={handleCancel}>
            주문 취소
          </Button>
          <Button
            size="medium"
            scheme="primary"
            onClick={() => setShowPaymentModal(true)}
          >
            간편 결제
          </Button>
        </ActionSection>
      )}

      <OrderListSection>
        <Title size="medium">주문 상품</Title>
        <ul>
          {order.books &&
            order.books.map((book: any) => (
              <li key={book.book_id}>
                <div className="book-info">
                  <span className="title">{book.title}</span>
                  <span className="qty">{book.quantity}권</span>
                  <span className="price">{formatNumber(book.price)}원</span>
                </div>
              </li>
            ))}
        </ul>
      </OrderListSection>

      {showPaymentModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>간편 결제</h3>
            <div className="input-group">
              <label>카드 번호</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="****-****-****-****"
              />
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
                placeholder="마지막 번호 1/2/3 테스트"
              />
            </div>
            <div className="actions">
              <Button
                size="small"
                scheme="normal"
                onClick={() => setShowPaymentModal(false)}
              >
                닫기
              </Button>
              <Button size="small" scheme="primary" onClick={handlePayment}>
                결제하기
              </Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 24px 0;
  max-width: 800px;
  margin: 0 auto;
`;

const StatusSection = styled.div`
  margin: 32px 0;
  text-align: center;
  background: ${({ theme }) => theme.color.background_light || '#f9f9f9'};
  padding: 40px;
  border-radius: 12px;

  .label {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.secondary};
    margin-bottom: 12px;
  }
  .status {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.color.primary};
  }
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
`;

const OrderListSection = styled.div`
  ul {
    list-style: none;
    padding: 0;
    li {
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      padding: 16px 0;
      .book-info {
        display: flex;
        justify-content: space-between;
        .title {
          flex: 1;
          margin-right: 16px;
          font-weight: 500;
        }
        .qty {
          margin-right: 16px;
          color: ${({ theme }) => theme.color.secondary};
        }
        .price {
          font-weight: bold;
        }
      }
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  width: 400px;

  h3 {
    margin-top: 0;
    margin-bottom: 24px;
    font-size: 1.5rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    gap: 8px;

    label {
      font-weight: 500;
    }
    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }
`;
