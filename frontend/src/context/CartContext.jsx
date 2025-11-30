import React, { useState, useEffect, useContext } from "react";
import CartContextDefault from "./cartContextValue";
import api from "../services/api";
import { AuthContext as AuthCtxFromValue } from "./authContextValue"; 
export const CartContext = CartContextDefault;
export function CartProvider({ children }) {
  const authCtx = useContext(AuthCtxFromValue);
  const user = authCtx?.user ?? null;

  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const syncCart = async () => {
      if (user && items.length > 0) {
        try {
          const payload = items.map((i) => ({
            productId: i.product || i.productId,
            size: i.size,
            qty: i.qty,
          }));
          await api.put("/cart/update", { items: payload });
        } catch (err) {
          console.error("Cart sync failed:", err);
        }
      }
    };
    syncCart();
  }, [user, items]);

  const addToCart = (product, size, qty = 1) => {
    const productId = product._id || product.product || product;
    const idx = items.findIndex((i) => i.product === productId && i.size === size);
    if (idx > -1) {
      const copy = [...items];
      copy[idx].qty = Number(copy[idx].qty) + Number(qty);
      setItems(copy);
    } else {
      const newItem = {
        product: productId,
        name: product.name || "",
        price: product.price || 0,
        image: product.image || "",
        size,
        qty: Number(qty),
      };
      setItems((prev) => [...prev, newItem]);
    }
  };

  const updateQty = (productId, size, qty) =>
    setItems((prev) =>
      prev.map((i) => (i.product === productId && i.size === size ? { ...i, qty: Number(qty) } : i))
    );

  const removeItem = (productId, size) =>
    setItems((prev) => prev.filter((i) => !(i.product === productId && i.size === size)));

  const clear = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ items, addToCart, updateQty, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
