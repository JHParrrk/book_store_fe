import useToastStore, { ToastItem } from "../../../stores/toastStore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPlus, FaBan, FaInfoCircle } from "react-icons/fa";
import { useTimeout } from "../../../hooks/useTimeout";

export const TOAST_REMOVE_DELAY = 3000;

const Toast = ({ id, message, type }: ToastItem) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleRemoveToast = () => {
    setIsFadingOut(true);
  };
  const handleAnimationEnd = () => {
    if (isFadingOut) {
      removeToast(id);
    }
  };

  useTimeout(() => {
    handleRemoveToast();
  }, TOAST_REMOVE_DELAY);

  return (
    <ToastStyle
      className={isFadingOut ? "fade-out" : "fade-in"}
      onAnimationEnd={handleAnimationEnd}
    >
      <p>
        {type === "info" ? <FaInfoCircle /> : <FaBan />}
        {message}
      </p>
      <button onClick={handleRemoveToast}>
        <FaPlus />
      </button>
    </ToastStyle>
  );
};

const ToastStyle = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }

  background-color: ${({ theme }) => theme.color.background};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;
  /* opacity: 0;
  transition: all 0.3s ease-in-out; */

  p {
    color: ${({ theme }) => theme.color.text};
    line-height: 1;
    margin: 0;
    flex: 1;
    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;

    svg {
      transform: rotate(45deg);
    }
  }
`;

export default Toast;
