import { useEffect, useState } from "react";
import API from "../services/api";
import { addReview } from "../services/reviewService";
import StarRating from "../components/StarRating";
import { toast } from "react-toastify";
import { cancelOrder } from "../services/orderService";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = async () => {
    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      await addReview({
        product: selectedProduct.productId,
        userId: user._id,
        userName: user.name,
        rating,
        comment,
      });

      toast.success("Review Added Successfully");

      setComment("");
      setRating(5);
      setSelectedProduct(null);

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to Add Review"
      );
    }
  };

  const handleCancelOrder = async (id) => {
  try {
    await cancelOrder(id);

    toast.success("Order Cancelled");

    fetchOrders();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Cannot Cancel Order"
    );
  }
};


  return (
    <div className="container">

      <h1>Order History</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="cart-item"
          >

            <h2>
              Order #
              {order._id
                .slice(-6)
                .toUpperCase()}
            </h2>

            <h3>{order.customerName}</h3>

            <p>
              <strong>Address:</strong>{" "}
              {order.address}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.phone}
            </p>

            <hr />

            <h3>Products</h3>

            {order.products &&
            order.products.length > 0 ? (
              order.products.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "20px",
                  }}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    width="100"
                    height="100"
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4>{item.name}</h4>

                    <p>₹ {item.price}</p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    {user?.role === "user" &&
                      order.status === "Delivered" && (
                        <button
                          onClick={() =>
                            setSelectedProduct(item)
                          }
                        >
                          ⭐ Rate Product
                        </button>
                      )}

                      {user?.role === "user" &&
 order.status === "Pending" && (

<button
  style={{
    background: "red",
    marginTop: "15px",
  }}
  onClick={() =>
    handleCancelOrder(order._id)
  }
>
  Cancel Order
</button>

)}


                  </div>

                </div>
              ))
            ) : (
              <p>No Products Found</p>
            )}

            <hr />

            <h2>
              Total : ₹ {order.totalAmount}
            </h2>

            <p>
              <strong>Status : </strong>

              <span
                style={{
                  color:
order.status==="Pending"
? "orange"
: order.status==="Shipped"
? "blue"
: order.status==="Delivered"
? "green"
: "red",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>

            <p>
              <strong>Ordered On : </strong>

              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>

          </div>
        ))
      )}

      {user?.role === "user" &&
        selectedProduct && (

        <div
          style={{
            marginTop: "40px",
            background: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,.15)",
          }}
        >

          <h2>
            Review {selectedProduct.name}
          </h2>

          <p>Your Rating</p>

          <StarRating
            rating={rating}
            setRating={setRating}
          />

          <textarea
            rows="5"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

          <br />
          <br />

          <button
            onClick={handleReview}
          >
            Submit Review
          </button>

          <button
            style={{
              marginLeft: "10px",
              background: "gray",
            }}
            onClick={() => {
              setSelectedProduct(null);
              setComment("");
              setRating(5);
            }}
          >
            Cancel
          </button>

        </div>
      )}

    </div>
  );
}

export default OrderHistory;