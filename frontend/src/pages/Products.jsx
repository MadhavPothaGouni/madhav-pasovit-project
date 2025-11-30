// src/pages/Products.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import "./Products.css"

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetchProducts moved inside useEffect to avoid the lint warning
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async (filters = {}) => {
      try {
        setLoading(true);
        const res = await api.get("/products", {
          params: { limit: 20, ...filters },
          signal, // axios supports passing AbortSignal in recent versions
        });
        setProducts(res.data.products || []);
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") {
          // request cancelled - ignore
        } else {
          console.error("fetchProducts error:", err);
          setProducts([]); // optional fallback
        }
      } finally {
        setLoading(false);
      }
    };

    // initial load
    fetchProducts();

    // cleanup on unmount
    return () => {
      controller.abort();
    };
  }, []); // run once on mount

  // Called by Filters component; we keep this outside useEffect
  const handleFilter = async (filters) => {
    try {
      setLoading(true);
      const res = await api.get("/products", { params: { limit: 20, ...filters } });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("filter fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3>Products</h3>

      <Filters onFilter={handleFilter} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid">
          {products?.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
