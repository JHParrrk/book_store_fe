import React, { useState } from "react";
import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import CategoryItem from "./categoryItem";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { category } = useCategory(); // category: 전체 목록
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const location = useLocation(); // Get the current route

  const mainCategories = category.filter((item) => item.parent_id === null);

  const handleToggle = (id: number | null) => {
    if (id === null) return; // ID가 null이면 무시

    setExpandedIds((prevIds) => {
      if (prevIds.includes(id)) {
        // 이미 펼쳐져 있으면 제거 (접기)
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        // 펼쳐져 있지 않으면 추가 (펼치기)
        return [...prevIds, id];
      }
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <SidebarStyle isOpen={isOpen}>
        <h3>카테고리</h3>
        <ul>
          <AllLinkItemStyle>
            <Link to="/books/search" onClick={onClose}>
              전체
            </Link>
          </AllLinkItemStyle>
          {/* Level 1 (메인 카테고리) 렌더링 */}
          {mainCategories.map((item) => (
            <CategoryItem
              key={item.id ?? "all"}
              item={item}
              allCategories={category} // 전체 데이터 전달
              expandedIds={expandedIds}
              onToggle={handleToggle}
              onClose={onClose}
              depth={1} // 시작 깊이는 1
            />
          ))}
        </ul>
      </SidebarStyle>
    </>
  );
};

const SidebarStyle = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  z-index: 1000;
  background-color: ${({ theme }) => theme.color.background};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"}; /* 슬라이드 인/아웃 효과 */
  transition: transform 0.3s ease;

  h3 {
    margin-bottom: 20px;
    font-size: 1.3rem;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const AllLinkItemStyle = styled.li`
  margin-bottom: 8px;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.text};
    font-size: 1rem;
    font-weight: 500;

    display: block;
    padding: 5px 0;
  }
`;

export default Sidebar;
