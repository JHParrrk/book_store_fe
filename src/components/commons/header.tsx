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
import Dropdown from "./dropdown";
import ThemeSwitcher from "../header/themeSwitcher";
import { useAuthStore } from "../../stores/authStore";

const Event = [
  { id: null, name: "베스트" },
  { id: 0, name: "신상품" },
  { id: 1, name: "이벤트" },
  { id: 2, name: "이런용도" },
];

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const event = Event;
  const { isloggedIn, storeLogout } = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <HeaderStyle $isOpen={isMobileOpen}>
      {/* 🎯 [좌측] 메인 사이드바 버튼 */}
      <button className="menu-button left-menu-btn" onClick={onMenuClick}>
        <FaBars />
      </button>

      {/* 🎯 [중앙] 로고 */}
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="book store" />
        </Link>
      </h1>

      {/* 🎯 [우측 1] 카테고리/이벤트 메뉴 (모바일에서는 햄버거 버튼) */}
      <nav className="event">
        <button
          className="menu-button mobile-toggle-btn"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <FaAngleRight /> : <FaBars />}
        </button>
        <ul>
          {event.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id === null ? `/event` : `/event?event_id=${item.id}`}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 🎯 [우측 2] 인증/유저 메뉴 */}
      <nav className="auth">
        <Dropdown toggleButton={<FaUserCircle className="icon-btn" />}>
          {isloggedIn ? (
            <ul>
              <li>
                <Link to="/basket">
                  <FaShoppingBasket />
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
                  <FaSignInAlt />
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <FaRegUser />
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
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  /* 공통 아이콘 버튼 스타일 (배경 X, 테두리 X) */
  .menu-button,
  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px; /* 최소한의 클릭 영역 */
    color: ${({ theme }) => theme.color.text};
    transition: color 0.2s ease;

    svg {
      font-size: 1.5rem;
    }

    &:hover {
      color: ${({ theme }) => theme.color.primary};
    }
  }

  /* 🎯 [수정됨] 좌측 메뉴 버튼이 데스크톱에서도 보이도록 display: flex를 유지하고 마진을 줍니다. */
  .left-menu-btn {
    display: flex;
    margin-right: 24px;
  }

  /* 데스크톱에서 우측 모바일 토글 버튼은 숨김 */
  .mobile-toggle-btn {
    display: none;
  }

  .logo {
    img {
      width: 200px;
    }
  }

  /* 데스크톱 메뉴 스타일 */
  .event {
    ul {
      display: flex;
      gap: 32px;
      margin-right: 32px; /* Auth와 간격 추가 */
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

  /* 데스크톱 인증 메뉴 */
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
          color: ${({ theme }) => theme.color.text};
          svg {
            margin-right: 6px;
          }
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  /* 📱 모바일 미디어 쿼리 */
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    height: 52px;
    padding: 0 12px;

    justify-content: flex-start;
    gap: 8px;

    /* 1. 좌측 메뉴 버튼 */
    .left-menu-btn {
      order: 1;
      margin-right: 0;
      /* 스타일은 공통 스타일을 따름 */
    }

    /* 2. 로고 (남은 공간 차지) */
    .logo {
      order: 2;
      flex-grow: 1;
      display: flex;
      justify-content: center;

      img {
        width: 120px;
      }
    }

    /* 3. 인증/유저 아이콘 */
    .auth {
      order: 3;
      position: static;

      .dropdown-toggle,
      .icon-btn {
        padding: 4px;
      }
    }

    /* 4. 이벤트/카테고리 메뉴 (토글 버튼과 드롭다운) */
    .event {
      order: 4;

      /* 모바일에서는 데스크톱 메뉴(ul)를 숨김 */
      ul {
        display: none;
        margin-right: 0;
      }

      /* 모바일 토글 버튼만 보임 */
      .mobile-toggle-btn {
        display: flex;
        position: static;
        z-index: 1001;

        color: ${({ $isOpen, theme }) =>
          $isOpen ? theme.color.primary : theme.color.text};
      }

      /* 모바일 드롭다운 메뉴 스타일 */
      ul {
        position: fixed;
        top: 0;
        right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
        width: 70%;
        height: 100vh;
        background: ${({ theme }) => theme.color.background};
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);

        margin: 0;
        padding: 60px 24px;
        z-index: 1000;
        transition: right 0.3s ease-in-out;

        flex-direction: column;
        gap: 24px;

        li a {
          font-size: 1.2rem;
        }
      }
    }
  }
`;

export default Header;
