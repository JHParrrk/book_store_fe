export interface Book {
  id: number; // 책 ID
  title: string; // 제목
  author: string; // 저자
  image_url: string; // 이미지 URL
  price: number; // 가격 (문자열로 표현됨)
  summary: string; // 요약
  published_date: string; // 출판일 (ISO8601 형식)
  likes: number; // 좋아요 수
}

export interface BookDetail extends Book {
  isbn: string; // ISBN 번호
  description: string; // 상세 설명
  table_of_contents: string; // 목차
  form: string; // 형태 (e.g., 양장본)
  category_id: number; // 카테고리 ID
  category_name: string; // 카테고리 이름
  isLiked: boolean; // 좋아요 여부 (true/false로 보정)
}
