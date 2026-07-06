import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Admin from "./pages/Admin";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";






function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route
  path="/checkout"
  element={<Checkout />}
/>

<Route
  path="/orders"
  element={<OrderHistory />}
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>

<Route
  path="/add-product"
  element={
    <ProtectedRoute>
      <AddProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-product/:id"
  element={
    <ProtectedRoute>
      <EditProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/wishlist"
  element={<Wishlist />}
/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;