import API from "./api";

export const createOrder = async (orderData) => {
  const { data } = await API.post("/orders", orderData);
  return data;
};

export const cancelOrder = async (id) => {
  const { data } = await API.put(`/orders/cancel/${id}`);
  return data;
};