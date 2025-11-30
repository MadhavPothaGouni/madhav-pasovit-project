import React, { useContext } from "react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, clear } = useContext(CartContext);
  const nav = useNavigate();

  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  const placeOrder = async () => {
    try {
      
      const res = await api.post("/orders");
      clear();
     
      const orderId = res?.data?.orderId || res?.data?.order?._id || "";
      nav(`/order/${orderId}`);
    } catch (err) {
      console.error("Place order error:", err);
    
      alert("Place order failed. Make sure you are logged in and your cart is not empty.");
    }
  };

  return (
    <div className="container">
      <h3>Checkout</h3>
      <div>Total: ₹{total}</div>
      <button className="btn" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}
