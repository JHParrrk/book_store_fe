import React from 'react';
import styled from 'styled-components';
import Title from '@/components/commons/Title';
import Button from '@/components/commons/Button';
import { useNavigate } from 'react-router-dom';

export default function PaymentComplete() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title size="large">결제가 완료되었습니다!</Title>
      <p>저희 서점을 이용해주셔서 감사합니다.</p>
      <Actions>
        <Button
          size="medium"
          scheme="primary"
          onClick={() => navigate('/orderlist')}
        >
          주문 내역으로 가기
        </Button>
        <Button size="medium" scheme="normal" onClick={() => navigate('/')}>
          홈으로 가기
        </Button>
      </Actions>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 16px;

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.secondary};
  }
`;

const Actions = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 10px;
`;
