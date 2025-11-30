import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to Clothify</h2>
      <Link to="/products" className="home-button">
        Browse Products
      </Link>
    </div>
  );
}
