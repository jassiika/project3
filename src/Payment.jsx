import { useState } from "react";
import { useCart } from "./CartContext";
import "./Payment.css";

export default function Payment({ onBack }) {
  const { cart, total, clearCart } = useCart();

  const [form, setForm] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});
  const [paid, setPaid] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "number") {
      value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (name === "expiry") {

      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Enter the name on the card";
    if (form.number.replace(/\s/g, "").length !== 16)
      err.number = "Card number must be 16 digits";
    const match = form.expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match || Number(match[1]) < 1 || Number(match[1]) > 12)
      err.expiry = "Use MM/YY format";
    if (form.cvv.length < 3) err.cvv = "CVV must be 3 or 4 digits";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setPaid(true);
      clearCart();
    }
  };

  if (paid) {
    return (
      <main className="payment-page">
        <div className="payment-box success">
          <h2>Payment Successful ✅</h2>
          <p>Thank you for your purchase!</p>
          <button className="pay-btn" onClick={onBack}>
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="payment-page">
      <div className="payment-box">
        <h2>Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="summary-items">
            {cart.map((item) => (
              <div className="summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="summary-details">
                  <span className="cart-name">{item.name}</span>
                  <span>
                    ${item.price} × {item.quantity}
                  </span>
                </div>
                <span className="summary-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
        <h3 className="total">Total: ${total.toFixed(2)}</h3>
        <button className="back-btn" onClick={onBack}>
          ← Back to Shopping
        </button>
      </div>

      <form className="payment-box" onSubmit={handleSubmit} noValidate>
        <h2>Credit Card Payment</h2>

        <label>
          Name on Card
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Card Number
          <input
            type="text"
            name="number"
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            value={form.number}
            onChange={handleChange}
          />
          {errors.number && <span className="error">{errors.number}</span>}
        </label>

        <div className="row">
          <label>
            Expiry (MM/YY)
            <input
              type="text"
              name="expiry"
              inputMode="numeric"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
            />
            {errors.expiry && <span className="error">{errors.expiry}</span>}
          </label>

          <label>
            CVV
            <input
              type="password"
              name="cvv"
              inputMode="numeric"
              placeholder="123"
              value={form.cvv}
              onChange={handleChange}
            />
            {errors.cvv && <span className="error">{errors.cvv}</span>}
          </label>
        </div>

        <button className="pay-btn" type="submit" disabled={cart.length === 0}>
          Pay ${total.toFixed(2)}
        </button>
      </form>
    </main>
  );
}
