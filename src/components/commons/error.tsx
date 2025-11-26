import React from "react";
import styled from "styled-components";
import { useRouteError, useNavigate } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

const Error = () => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <ErrorPageStyle>
      <h1>오류가 발생했습니다.</h1>
      <p>다음과 같은 오류가 발생했습니다.</p>
      <p>{error.statusText || error.message}</p>
      <button onClick={handleGoBack}>뒤로가기</button>
    </ErrorPageStyle>
  );
};

const ErrorPageStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.color.background};

  h1 {
    font-size: 4rem;
    color: ${({ theme }) => theme.color.primary};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.color.text};
  }

  button {
    margin-top: 1.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: ${({ theme }) => theme.color.primary};
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.color.primary};
    }
  }
`;

export default Error;
