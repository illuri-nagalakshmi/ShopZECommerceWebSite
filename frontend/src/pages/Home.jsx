import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Dynamic Categories
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">

      {user && user.role === "user" && (
        <div className="welcome-box">
          <h1>
            👋 Welcome,
            <span className="welcome-name">
              {" "}
              {user.name}
            </span>
          </h1>

          <p>Happy Shopping with ShopEZ ❤️</p>
        </div>
      )}

      {!user && (
        <div className="welcome-box">
          <h1>🛒 Welcome to ShopEZ</h1>

          <p>Login or Register to enjoy shopping.</p>
        </div>
      )}

      <h1>🛍️ Explore Our Products</h1>

      <div className="filters">

        <input
          type="text"
          placeholder="🔍 Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

      </div>

      <div className="products-grid">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <h2>No Products Found</h2>
        )}

      </div>

    </div>
  );
}

export default Home;