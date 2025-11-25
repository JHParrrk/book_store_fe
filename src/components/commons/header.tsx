import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import {
  FaAngleRight,
  FaBars,
  FaRegUser,
  FaShoppingBasket,
  FaSignInAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconBaseProps } from "react-icons";
import Dropdown from "./dropdown";
import ThemeSwitcher from "../header/themeSwitcher";
import { useAuthStore } from "../../stores/authStore";

const SignInIcon: React.FC<IconBaseProps> = (props) => {
  const Icon = FaSignInAlt as unknown as React.ComponentType<IconBaseProps>;
  return <Icon {...props} />;
};
const RegUserIcon: React.FC<IconBaseProps> = (props) => {
  const Icon = FaRegUser as unknown as React.ComponentType<IconBaseProps>;
  return <Icon {...props} />;
};
const AngleRightIcon: React.FC<IconBaseProps> = (props) => {
  const Icon = FaAngleRight as unknown as React.ComponentType<IconBaseProps>;
  return <Icon {...props} />;
};
const BarsIcon: React.FC<IconBaseProps> = (props) => {
  const Icon = FaBars as unknown as React.ComponentType<IconBaseProps>;
  return <Icon {...props} />;
};
const ShoppingBasketIcon: React.FC<IconBaseProps> = (props) => {
  const Icon =
    FaShoppingBasket as unknown as React.ComponentType<IconBaseProps>;
  return <Icon {...props} />;
};
const UserCircleIcon: React.FC<IconBaseProps> = (props) => {
  const Icon = FaUserCircle as unknown as React.ComponentType<IconBaseProps>;
  return <Icon {...props} />;
};

const CATEGORY = [
  {
    id: null,
    name: "전체",
  },
  {
    id: 0,
    name: "동화",
  },
  {
    id: 1,
    name: "소설",
  },
  {
    id: 2,
    name: "문학",
  },
];

const Header = () => {
  // const { category } = useCategory();
  const category = CATEGORY;
  const { isloggedIn, storeLogout } = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <HeaderStyle $isOpen={isMobileOpen}>
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="book store" />
        </Link>
      </h1>
      <nav className="category">
        <button
          className="menu-button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <AngleRightIcon /> : <BarsIcon />}
        </button>
        <ul>
          {category.map((item) => (
            <li key={item.id}>
              <Link
                to={
                  item.id === null ? `/books` : `/books?category_id=${item.id}`
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        <Dropdown toggleButton={<UserCircleIcon />}>
          {isloggedIn ? (
            <ul>
              <li>
                <Link to="/basket">
                  <ShoppingBasketIcon />
                  장바구니
                </Link>
              </li>
              <li>
                <Link to="/orderlist">주문내역</Link>
              </li>
              <li>
                <button onClick={storeLogout}>로그아웃</button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">
                  <SignInIcon />
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <RegUserIcon />
                  회원가입
                </Link>
              </li>
            </ul>
          )}
          <ThemeSwitcher />
        </Dropdown>
      </nav>
    </HeaderStyle>
  );
};

interface HeaderStyleProps {
  $isOpen: boolean;
}

const HeaderStyle = styled.header<HeaderStyleProps>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    .menu-button {
      display: none;
    }
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};

          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100px;
      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          line-height: 1;
          background: none;
          border: 0;
          cursor: pointer;
          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    height: 52px;

    .logo {
      padding: 0 0 0 12px;

      img {
        width: 140px;
      }
    }

    .auth {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .category {
      .menu-button {
        display: flex;
        position: absolute;
        top: 14px;
        right: ${({ $isOpen }) => ($isOpen ? "62%" : "52px")};
        background: #fff;
        border: 0;
        font-size: 1.5rem;
      }

      ul {
        position: fixed;
        top: 0;
        right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

        margin: 0;
        padding: 24px;
        z-index: 1000;

        flex-direction: column;
        gap: 16px;
      }
    }
  }
`;

export default Header;
