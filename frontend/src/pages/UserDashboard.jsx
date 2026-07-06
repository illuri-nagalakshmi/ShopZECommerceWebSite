import { Link } from "react-router-dom";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h1>👋 Welcome {user?.name}</h1>

      <h2>User Dashboard</h2>

      <div style={{ marginTop: "30px" }}>
        <Link to="/cart">
          <button>🛒 My Cart</button>
        </Link>

        <Link to="/wishlist">
          <button>❤️ My Wishlist</button>
        </Link>

        <Link to="/orders">
          <button>📦 My Orders</button>
        </Link>

        <Link to="/">
          <button>🏠 Continue Shopping</button>
        </Link>

        <button onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;