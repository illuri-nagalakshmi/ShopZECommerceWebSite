import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { toast } from "react-toastify";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  const [name, setName] = useState("");
  const [address, setAddress] =useState("");
  const [phone, setPhone] = useState("");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your Cart is Empty");
      return;
    }

    try {

      const orderData = {
  userId: user._id,

  customerName: name,

  address,

  phone,

  products: cartItems.map((item) => ({
    productId: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  })),

  totalAmount,
};

      await createOrder(orderData);

      clearCart();

      toast.success("Order Placed Successfully");

      setName("");
      setAddress("");
      setPhone("");

      navigate("/orders");

    } catch (error) {
      console.log(error);
      toast.error("Failed to Place Order");
    }
  };

  return (
    <div className="container">

      <h1>Checkout</h1>

      <h2>Total Amount : ₹ {totalAmount}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Enter Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          required
        />

        <button type="submit">
          Place Order
        </button>

      </form>

    </div>
  );
}

export default Checkout;