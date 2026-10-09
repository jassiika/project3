import { useState } from "react";
import "./App.css";

const SHOES = [
  {
    id: 1,
    name: "ASIAN Mens Thar-13 Sneaker",
    price: 120,
    image: "/images/shoe1.avif",
  },
  {
    id: 2,
    name: "ASIAN Men's AIRWEAVE-02 Sports Shoes",
    price: 40,
    image: "/images/shoe2.jpg",
  },
  {
    id: 3,
    name: "White Casual Sneaker",
    price: 70,
    image: "/images/shoe3.avif",
  },
  {
    id: 4,
    name: "MACTREE Men's Mid Top Ankle Boots",
    price: 90,
    image: "/images/shoe4.avif",
  },
  {
    id: 5,
    name: "Campus Men's Sneakers",
    price: 50,
    image: "/images/shoe5.jpg",
  },
  {
    id: 6,
    name: "Campus Men's OG-03 Sneakers",
    price: 75,
    image: "/images/shoe.avif",
  },
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === shoe.id);
      if (existing) {
        return prev.map((item) =>
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { ...shoe, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">👟</div>
        <a href="#home">Home</a>
        <a href="#categories">Categories</a>
        <a href="#about">About Us</a>
      </nav>

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
        </aside>
      </main>
    </div>
  );
}
