import { Link } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToWishlist } = useContext(WishlistContext);

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <h4>₹ {product.price}</h4>

      <span className="category">
        {product.category}
      </span>

      <div className="card-buttons">
        <Link to={`/product/${product._id}`}>
          <button>View Details</button>
        </Link>

        <button
          onClick={() =>
            addToWishlist(product)
          }
        >
          ❤️ Wishlist
        </button>
      </div>
    </div>
  );
}

export default ProductCard;