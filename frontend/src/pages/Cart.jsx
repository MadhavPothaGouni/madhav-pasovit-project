import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { items, removeItem, updateQty, clear } = useContext(CartContext);
  const nav = useNavigate();
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="cart-container">
      <h3 className="cart-title">Your Cart</h3>

      {items.length === 0 ? (
        <p className="cart-empty">Cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <CartItem
                key={item.product + item.size}
                item={item}
                onRemove={removeItem}
                onUpdate={updateQty}
              />
            ))}
          </div>

          <h4 className="cart-total">Total: ₹{total}</h4>

          <div className="cart-actions">
            <button className="btn-primary" onClick={() => nav("/checkout")}>
              Checkout
            </button>

            <button className="btn-clear" onClick={clear}>
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
}
