import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/themeContext";

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <StyledButton onClick={toggleTheme}>
      {themeName === "light"
        ? "🌙 Switch to Dark Mode"
        : "🌞 Switch to Light Mode"}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background};
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default ThemeSwitcher;
