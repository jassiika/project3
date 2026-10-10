import { useState } from "react";
import "./App.css";
import { CartProvider, useCart } from "./CartContext";
import Payment from "./Payment";

const SHOES = [
  { id: 1, name: "ASIAN Mens Thar-13 Sneaker", price: 120, image: "/images/shoe1.avif" },
  { id: 2, name: "ASIAN Men's AIRWEAVE-02 Sports Shoes", price: 40, image: "/images/shoe2.jpg" },
  { id: 3, name: "White Casual Sneaker", price: 70, image: "/images/shoe3.avif" },
  { id: 4, name: "MACTREE Men's Mid Top Ankle Boots", price: 90, image: "/images/shoe4.avif" },
  { id: 5, name: "Campus Men's Sneakers", price: 50, image: "/images/shoe5.jpg" },
  { id: 6, name: "Campus Men's OG-03 Sneakers", price: 75, image: "/images/shoe.avif" },
];

function Store() {

  const { cart, addToCart, removeFromCart, total } = useCart();

  const [page, setPage] = useState("shop");

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">👟</div>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setPage("shop");
          }}
        >
          Home
        </a>
        <a href="#categories">Categories</a>
        <a href="#about">About Us</a>
      </nav>

      {page === "payment" ? (
        <Payment onBack={() => setPage("shop")} />
      ) : (
        <main className="layout">
          <section className="shoes">
            {SHOES.map((shoe) => (
              <div className="shoe-card" key={shoe.id}>
                <img src={shoe.image} alt={shoe.name} />
                <div className="shoe-info">
                  <h3>{shoe.name}</h3>
                  <p>${shoe.price}</p>
                  <button onClick={() => addToCart(shoe)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </section>

          <aside className="cart">
            <h2>Cart</h2>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-details">
                    <span className="cart-name">{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                  <div className="qty">
                    <button
                      aria-label={`Decrease ${item.name}`}
                      onClick={() => removeFromCart(item.id)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase ${item.name}`}
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="total">Total: ${total.toFixed(2)}</h3>
            <button
              className="proceed-btn"
              disabled={cart.length === 0}
              onClick={() => setPage("payment")}
            >
              Proceed to Payment
            </button>
          </aside>
        </main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Store />
    </CartProvider>
  );
}
