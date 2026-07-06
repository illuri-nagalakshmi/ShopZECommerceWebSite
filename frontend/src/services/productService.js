import API from "./api";

// Get All Products
export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

// Get Product By Id
export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

// Delete Product
export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};

// Update Product
export const updateProduct = async (id, productData) => {
  const response = await API.put(
    `/products/${id}`,
    productData
  );

  return response.data;
};