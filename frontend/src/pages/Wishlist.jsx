import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  return (
    <div>
      <h1>My Wishlist ❤️</h1>

      {wishlistItems.length === 0 ? (
        <h3>Your Wishlist is Empty</h3>
      ) : (
        wishlistItems.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{item.name}</h3>

            <p>₹ {item.price}</p>

            <button
              onClick={() =>
                removeFromWishlist(item._id)
              }
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;