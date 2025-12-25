import { useState } from "react";
import { menuItems } from "./data";

export default function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [payment, setPayment] = useState(null);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const taxRate = payment === "cod" ? 0.15 : payment === "card" ? 0.05 : 0;
  const total = subtotal + subtotal * taxRate;

  const filtered = menuItems.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <i className="fas fa-mug-hot"></i>
          <span>b r è v i a</span>
          {cart.length > 0 && <span className="cart-badge show">{cart.length}</span>}
        </div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Welcome to brèvia</h1>
          <h2>Contemporary Coffee, Crafted with Care</h2>
          <button className="cta-btn" onClick={() => document.getElementById("menu").scrollIntoView()}>
            Explore Menu
          </button>
        </div>
      </section>

      {/* MENU */}
      <section className="section menu-categories" id="menu">
        <div className="container">
          <h2>Our Menu</h2>

          <div className="search-container">
            <input
              id="menu-search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="drink-grid">
            {filtered.map((item) => (
              <div className="drink-card" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="drink-card-content">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className="drink-card-price">${item.price.toFixed(2)}</div>
                  <button className="order-btn" onClick={() => addToCart(item)}>
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CART MODAL */}
      {showCart && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowCart(false)}>&times;</span>
            <h3>Your Order</h3>

            {cart.map((i) => (
              <p key={i.id}>{i.name} × {i.qty}</p>
            ))}

            <p>Subtotal: ${subtotal.toFixed(2)}</p>

            <div className="payment-option" onClick={() => setPayment("cod")}>
              <input type="radio" /> Cash on Delivery
            </div>
            <div className="payment-option" onClick={() => setPayment("card")}>
              <input type="radio" /> Card
            </div>

            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="cta-btn">Place Order</button>
          </div>
        </div>
      )}
    </>
  );
}