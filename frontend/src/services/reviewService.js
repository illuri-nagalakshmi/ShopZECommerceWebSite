import API from "./api";

// Add Review
export const addReview = async (reviewData) => {
  const { data } = await API.post("/reviews", reviewData);
  return data;
};

// Get Reviews
export const getReviews = async (productId) => {
  const { data } = await API.get(`/reviews/${productId}`);
  return data;
};