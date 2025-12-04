export interface CartItem {
  id: number; // cart 테이블의 PK
  user_id: number; // 사용자 ID (foreign key)
  book_id: number; // 도서 ID (foreign key)
  quantity: number; // 수량
  created_at?: string;
  updated_at?: string;

  // 백엔드에서 조인해서 user 정보 및 book 정보를 함께 내려주는 경우를 위해 선택적 필드로 포함
  user?: {
    id: number;
    name?: string;
    email?: string;
  };

  book?: {
    id: number;
    title?: string;
    author?: string;
    image_url?: string;
    price?: number;
  };
}

// 필요에 따라 전체 Cart(사용자별) 타입을 정의할 수도 있습니다.
export interface Cart {
  user_id: number;
  items: CartItem[];
}
