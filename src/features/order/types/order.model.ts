// 주문 목록 조회 인터페이스
export interface OrderListItem {
  order_id: number; // 주문 ID
  total_price: number; // 총 가격
  status: string; // 주문 상태 (예: 결제대기, 배송중 등)
  created_at: string; // 주문 생성일 (ISO8601)
  detail?: OrderDetail; // 상세 정보 (선택적)
}

// 책 정보 (주문 상세에 포함)
export interface OrderedBook {
  book_id: number; // 책 ID
  title: string; // 책 제목
  quantity: number; // 주문 수량
  price: number; // 개별 가격
}

// 배송 정보
export interface DeliveryInfo {
  recipient: string; // 수령인 이름
  address: string; // 배송 주소
  phone: string | null; // 수령인 전화번호
}

// 주문 상세 조회 인터페이스
export interface OrderDetail {
  id: number; // 주문 ID
  user_id: number; // 유저 ID
  delivery_info: DeliveryInfo; // 배송 정보
  total_price: number; // 총 가격
  status: string; // 주문 상태
  created_at: string; // 주문 생성일
  books: OrderedBook[]; // 주문된 책들의 리스트
}

// 주문서 생성 인터페이스 (POST /orders)
export interface OrderSheet {
  cart_item_ids: number[];
  use_default_address: boolean;
  delivery_info?: DeliveryInfo;
}
