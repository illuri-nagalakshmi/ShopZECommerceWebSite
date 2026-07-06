import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

import {
  getProducts,
  deleteProduct,
} from "../services/productService";

function Admin() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchProducts();
    fetchStats();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/admin/stats");
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, {
        status,
      });

      toast.success("Order Status Updated");

      fetchOrders();
      fetchStats();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);

      toast.success("Product Deleted Successfully");

      fetchProducts();
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-container">

      <div className="welcome-box">
        <h1>
          👑 Welcome,
          <span className="welcome-name">
            {" "}
            {user?.name}
          </span>
        </h1>

        <p>Manage your ShopEZ store from here.</p>
      </div>

      <h1 className="dashboard-title">
        Admin Dashboard
      </h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>📦</h2>
          <p>Total Products</p>
          <h1>{stats.totalProducts}</h1>
        </div>

        <div className="stat-card">
          <h2>👥</h2>
          <p>Total Users</p>
          <h1>{stats.totalUsers}</h1>
        </div>

        <div className="stat-card">
          <h2>🛒</h2>
          <p>Total Orders</p>
          <h1>{stats.totalOrders}</h1>
        </div>

        <div className="stat-card">
          <h2>💰</h2>
          <p>Total Revenue</p>
          <h1>₹ {stats.totalRevenue}</h1>
        </div>

      </div>

      <div className="add-product-btn">
        <Link to="/add-product">
          <button>➕ Add New Product</button>
        </Link>
      </div>

      <h1 className="products-title">
        All Products
      </h1>

      {products.map((product) => (

        <div
          key={product._id}
          className="admin-product"
        >

          <img
            src={product.image}
            alt={product.name}
          />

          <div className="admin-info">

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3>₹ {product.price}</h3>

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

          </div>

          <div className="admin-buttons">

            <Link
              to={`/edit-product/${product._id}`}
            >
              <button>
                ✏ Edit
              </button>
            </Link>

            <button
              onClick={() =>
                handleDelete(product._id)
              }
            >
              🗑 Delete
            </button>

          </div>

        </div>

      ))}

      <hr style={{ margin: "50px 0" }} />

      <h1 className="products-title">
        📦 Customer Orders
      </h1>

      {orders.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          No Orders Found
        </h2>
      ) : (
        orders.map((order) => (

          <div
            key={order._id}
            className="admin-product"
          >

            <div className="admin-info">

              <h2>{order.customerName}</h2>

              <p>📞 {order.phone}</p>

              <p>📍 {order.address}</p>

              <p>💰 ₹ {order.totalAmount}</p>

              <p>
                📅{" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>

              <h3>
                Status :
                <span
                  style={{
                    color:
                      order.status === "Pending"
                        ? "red"
                        : order.status === "Shipped"
                        ? "orange"
                        : "green",
                  }}
                >
                  {" "}
                  {order.status}
                </span>
              </h3>

            </div>

            <div className="admin-buttons">

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(
                    order._id,
                    e.target.value
                  )
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

              </select>

            </div>

          </div>

        ))
      )}

    </div>
  );
}

export default Admin;