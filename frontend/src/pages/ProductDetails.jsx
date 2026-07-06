import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { getReviews } from "../services/reviewService";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await getReviews(id);
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div className="details-container">

      <img
        src={product.image}
        alt={product.name}
        className="details-image"
      />

      <div className="details-info">

        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <h2>₹ {product.price}</h2>

        <span className="category">
          {product.category}
        </span>

        <br />
        <br />

        <button
          onClick={() => {
            addToCart(product);
            toast.success("Product Added To Cart");
          }}
        >
          🛒 Add To Cart
        </button>

        <button
  onClick={() => {
    addToCart(product);
    navigate("/checkout");
  }}
>
  ⚡ Buy Now
</button>

        <hr style={{ margin: "30px 0" }} />

        <h2>⭐ Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p>No Reviews Yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              style={{
                background: "#f8f8f8",
                padding: "15px",
                marginTop: "15px",
                borderRadius: "10px",
              }}
            >
              <h3>{review.userName}</h3>

              <div
                style={{
                  color: "#FFD700",
                  fontSize: "24px",
                  margin: "8px 0",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= review.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>

              <p>{review.comment}</p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default ProductDetails;