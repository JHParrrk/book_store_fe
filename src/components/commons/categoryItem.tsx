// CategoryItem.tsx

import React from "react";
import styled from "styled-components"; // DefaultTheme 제거
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Category } from "@/features/books/types/category.model";
import { LIMIT, PAGE_START } from '@/constants/pagination';

interface CategoryItemProps {
  item: Category;
  allCategories: Category[];

  expandedIds: number[];
  onToggle: (id: number | null) => void;
  onClose: () => void;
  depth: number;
}
const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  allCategories,
  expandedIds, // 💡 배열로 받음
  onToggle,
  onClose,
  depth,
}) => {
  // item.id가 null인 경우를 방지
  const itemId = item.id;

  const subCategories = allCategories.filter((cat) => cat.parent_id === itemId);
  const hasSubCategories = subCategories.length > 0;

  // 💡 isExpanded는 expandedIds 배열에 현재 ID가 포함되어 있는지 확인
  const isExpanded = itemId !== null && expandedIds.includes(itemId);

  // Level에 따른 들여쓰기 깊이
  const paddingLeft = depth > 1 ? `${(depth - 1) * 15}px` : 0;

  return (
    <CategoryItemStyle depth={depth}>
      <div className="category-item" style={{ paddingLeft: paddingLeft }}>
        <Link
          to={
            // itemId가 null이 아닌 경우만 처리: 분리된 '전체' 링크에 대한 조건 제거
            `/books/search?category_id=${itemId}&keyword=&page=${PAGE_START}&limit=${LIMIT}`
          }
          onClick={onClose}
        >
          {item.name}
        </Link>
        {hasSubCategories && (
          <button onClick={() => onToggle(itemId)} aria-expanded={isExpanded}>
            {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        )}
      </div>

      {/* 재귀적으로 하위 카테고리 렌더링 */}
      {hasSubCategories &&
        isExpanded && ( // 💡 isExpanded 조건 사용
          <ul className="sub-category">
            {subCategories.map((sub) => (
              <li key={sub.id}>
                <CategoryItem
                  item={sub}
                  allCategories={allCategories}
                  expandedIds={expandedIds} // 💡 expandedIds 배열 전달
                  onToggle={onToggle}
                  onClose={onClose}
                  depth={depth + 1}
                />
              </li>
            ))}
          </ul>
        )}
    </CategoryItemStyle>
  );
};

// 스타일드 컴포넌트 (SidebarStyle에서 필요한 스타일만 가져옵니다)
const CategoryItemStyle = styled.li<{ depth: number }>`
  margin-bottom: 8px; /* li 간격 조정 */

  .category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;

    /* Level에 따른 글꼴 크기 조정 */
    a {
      text-decoration: none;
      color: ${({ theme, depth }) =>
        depth === 1 ? theme.color.text : theme.color.secondary};
      font-size: ${({ depth }) => (depth === 1 ? "1rem" : "0.95rem")};
      font-weight: ${({ depth }) => (depth === 1 ? 500 : 400)};
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      color: ${({ theme }) => theme.color.text};
      padding: 0 5px;
      display: flex;
      align-items: center;

      svg {
        font-size: 1.2rem;
      }
    }
  }

  .sub-category {
    list-style: none;
    padding-left: 15px;
    margin: 0;

    /* 💡 Level 3 (depth >= 3) 이상부터 수평 레이아웃 적용 */
    ${({ depth }) =>
      depth >= 3 &&
      `
        display: flex;
        overflow-x: auto; /* 수평 스크롤 허용 */
        white-space: nowrap; /* 줄바꿈 방지 */
        padding-top: 5px;
        padding-bottom: 5px;

        /* 스크롤바 숨기기 (선택 사항) */
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}

    /* 레벨 1 (depth === 1)의 하위 메뉴에만 왼쪽 경계선 추가 */
    ${({ depth, theme }) =>
      depth === 1 &&
      `
        border-left: 2px solid ${theme.color.border};
        margin-top: 5px;
      `}

    /* 💡 하위 li 항목 스타일: 수평 정렬을 위해 필요 */
    li {
      /* Level 3 이상일 때 수평 간격 및 줄바꿈 방지 */
      ${({ depth }) =>
        depth >= 3 &&
        `
          display: inline-block;
          flex-shrink: 0; /* 공간이 부족해도 축소되지 않도록 함 */
          margin-right: 15px; /* 항목 간 수평 간격 */

          /* 깊이 레벨의 들여쓰기 제거 (수평 레이아웃에서는 필요 없음) */
          .category-item {
            padding-left: 0 !important;
          }
        `}
    }
  }
`;

export default CategoryItem;
