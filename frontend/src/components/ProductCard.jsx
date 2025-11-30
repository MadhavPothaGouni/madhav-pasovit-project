import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <div className="card">
      <img src={p.image} alt={p.name} style={{ width: "100%", borderRadius: 6 }} />
      <h4>{p.name}</h4>
      <p>₹{p.price}</p>
      <Link to={`/product/${p._id}`}><button className="btn">View</button></Link>
    </div>
  );
}
