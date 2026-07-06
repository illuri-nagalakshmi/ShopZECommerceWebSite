// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../context/CartContext";

// function Cart() {
//   const {
//     cartItems,
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//   } = useContext(CartContext);

//   const totalPrice = cartItems.reduce(
//     (total, item) =>
//       total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="container">
//       <h1>🛒 Shopping Cart</h1>

//       <h2>Total Items: {cartItems.length}</h2>

//       {cartItems.length === 0 ? (
//         <h3>Your Cart is Empty</h3>
//       ) : (
//         cartItems.map((item) => (
//           <div
//             key={item._id}
//             className="cart-item"
//           >
//             <h3>{item.name}</h3>

//             <p>{item.description}</p>

//             <h4>₹ {item.price}</h4>

//             <p>{item.category}</p>

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 margin: "15px 0",
//               }}
//             >
//               <button
//                 onClick={() =>
//                   decreaseQuantity(item._id)
//                 }
//               >
//                 −
//               </button>

//               <strong>{item.quantity}</strong>

//               <button
//                 onClick={() =>
//                   increaseQuantity(item._id)
//                 }
//               >
//                 +
//               </button>
//             </div>

//             <h4>
//               Subtotal: ₹{" "}
//               {item.price * item.quantity}
//             </h4>

//             <button
//               onClick={() =>
//                 removeFromCart(item._id)
//               }
//             >
//               Remove
//             </button>
//           </div>
//         ))
//       )}

//       <hr />

//       <h2>Total Price: ₹ {totalPrice}</h2>

//       <Link to="/checkout">
//         <button>
//           Proceed To Checkout
//         </button>
//       </Link>
//     </div>
//   );
// }

// export default Cart;


import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>🛒 Shopping Cart</h1>

      <h2>Total Items: {cartItems.length}</h2>

      {cartItems.length === 0 ? (
        <h3>Your Cart is Empty</h3>
      ) : (
        cartItems.map((item) => (
          <div
            key={item._id}
            className="cart-item"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
                display: "block",
                marginBottom: "15px",
              }}
            />

            <h3>{item.name}</h3>

            <p>{item.description}</p>

            <h4>₹ {item.price}</h4>

            <p>Category: {item.category}</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "15px 0",
              }}
            >
              <button onClick={() => decreaseQuantity(item._id)}>
                −
              </button>

              <strong>{item.quantity}</strong>

              <button onClick={() => increaseQuantity(item._id)}>
                +
              </button>
            </div>

            <h4>
              Subtotal: ₹ {item.price * item.quantity}
            </h4>

            <button onClick={() => removeFromCart(item._id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <hr />

      <h2>Total Price: ₹ {totalPrice}</h2>

      <Link to="/checkout">
        <button disabled={cartItems.length === 0}>
          Proceed To Checkout
        </button>
      </Link>
    </div>
  );
}

export default Cart;