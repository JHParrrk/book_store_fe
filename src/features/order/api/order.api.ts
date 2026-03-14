import { OrderListItem, OrderDetail, OrderSheet } from '@/features/order/types/order.model';
import { requestHandler } from '@/apis/https';

export const order = async (orderData: OrderSheet) => {
  return await requestHandler<OrderSheet>('post', '/orders', orderData);
};

export const fetchOrders = async () => {
  return await requestHandler<OrderListItem[]>('get', '/orders');
};

export const fetchOrder = async (orderId: number) => {
  return await requestHandler<OrderDetail>('get', `/orders/${orderId}`);
};

export const cancelOrder = async (orderId: number) => {
  return await requestHandler('post', `/orders/${orderId}/cancel`);
};

export const payOrder = async (orderId: number, data: { cardNumber: string; cvv: string }) => {
  return await requestHandler('post', `/orders/${orderId}/payment`, data);
};
