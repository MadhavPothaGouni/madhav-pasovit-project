import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="product-detail-container">

      <img src={product.image} className="product-detail-image" />

      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>

        <select
          className="size-selector"
          onChange={(e) => addToCart(product, e.target.value)}
        >
          <option value="">Select Size</option>
          {product.sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button className="btn-primary" onClick={() => nav("/cart")}>
          Go to Cart
        </button>
      </div>
    </div>
  );
}
