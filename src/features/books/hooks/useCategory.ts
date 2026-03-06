// src/hooks/useCategory.ts

import { useEffect, useState } from "react";
import { fetchCategory } from "@/features/books/api/category.api";
import { Category } from "@/features/books/types/category.model";

// 💡 캐시 키와 만료 시간(밀리초) 설정
const CATEGORY_CACHE_KEY = "category_cache";
// 1시간 (60분 * 60초 * 1000밀리초 = 3,600,000ms)
const CACHE_EXPIRATION_MS = 3600000;

// 캐시 구조를 정의합니다.
interface CategoryCache {
  data: Category[];
  timestamp: number; // 저장된 시간
}

// "전체" 카테고리를 추가하는 헬퍼 함수
const addAllCategory = (categories: Category[]): Category[] => {
  return [
    {
      id: null,
      name: "전체",
    },
    ...categories,
  ];
};

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    // 1. 캐시 확인 및 로드
    const cachedData = localStorage.getItem(CATEGORY_CACHE_KEY);
    const now = Date.now();

    if (cachedData) {
      const cache: CategoryCache = JSON.parse(cachedData);
      const isCacheValid = now - cache.timestamp < CACHE_EXPIRATION_MS;

      if (isCacheValid) {
        // 캐시가 유효하면 즉시 캐시된 데이터 사용
        setCategory(addAllCategory(cache.data));
        console.log("카테고리: 캐시된 데이터 사용");
        return; // API 요청을 막습니다.
      }
    }

    // 2. 캐시가 없거나 만료된 경우: API 요청
    console.log("카테고리: API 요청 실행");
    fetchCategory().then((fetchedCategory) => {
      if (!fetchedCategory) return;

      // 3. 응답 데이터를 캐시합니다.
      const newCache: CategoryCache = {
        data: fetchedCategory,
        timestamp: now,
      };
      localStorage.setItem(CATEGORY_CACHE_KEY, JSON.stringify(newCache));

      // 4. 상태 업데이트
      setCategory(addAllCategory(fetchedCategory));
    });
  }, []);

  return { category };
};
