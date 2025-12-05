import { OrderListItem, OrderDetail, OrderSheet } from "../models/order.model";
import { httpClient, requestHandler } from "./https";

// export const order = async (orderData: OrderSheet) => {
//   const response = await httpClient.post("/orders", orderData);

//   return response.data;
// };

export const order = async (orderData: OrderSheet) => {
  return await requestHandler<OrderSheet>("post", "/orders", orderData);
};

export const fetchOrders = async () => {
  return await requestHandler<OrderListItem[]>("get", "/orders");
};

export const fetchOrder = async (orderId: number) => {
  return await requestHandler<OrderDetail>("get", `/orders/${orderId}`);
};
