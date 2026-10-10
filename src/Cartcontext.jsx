import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);


export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === shoe.id);
      if (existing) {
        return prev.map((item) =>
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...shoe, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return context;
}
