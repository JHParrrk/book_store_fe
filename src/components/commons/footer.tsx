import React from "react";
import logo from '@/assets/images/logo.png';
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyle>
      <h1 className="logo">
        BookMarket
      </h1>
      <div className="copyright">
        <p>copyright(c), 2025, book store.</p>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  border-top: 1px solid ${({ theme }) => theme.color.background};
  padding: 20px 0;
  display: flex;
  justify-content: space-between;

  .logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.color.text};
  }

  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.text};
    }
  }

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    padding: 20px 12px;
  }
`;

export default Footer;
