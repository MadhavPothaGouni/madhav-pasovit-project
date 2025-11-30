import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { items } = useContext(CartContext);
  const { pathname } = useLocation();

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Brand */}
        <Link to="/" className="logo">
          <span className="logo-mark">C</span>
          <span className="logo-text">lothify</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link className={pathname === "/" ? "active" : ""} to="/">
            Home
          </Link>
          <Link className={pathname.startsWith("/products") ? "active" : ""} to="/products">
            Products
          </Link>
        </nav>

        {/* Actions */}
        <div className="actions">
          <Link to="/cart" className="cart-btn">
            Cart
            {items.length > 0 && <span className="cart-count">{items.length}</span>}
          </Link>

          {user ? (
            <div className="user-section">
              <span className="username">{user.name}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
