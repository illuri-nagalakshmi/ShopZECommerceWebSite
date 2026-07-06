import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="logo">
        🛒 ShopEZ
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && user.role === "user" && (
          <>
            <Link to="/cart">🛒 Cart</Link>
            <Link to="/wishlist">❤️ Wishlist</Link>
            <Link to="/orders">📦 Orders</Link>
          </>
        )}

        {user && user.role === "admin" && (
          <>
            <Link to="/admin">📊 Admin Dashboard</Link>
          </>
        )}

        {user && (
          <>
            <span className="welcome-user">
              👋 Hi, {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;