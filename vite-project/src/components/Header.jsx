import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">ShoppyGlobe</Link>
      <nav>
        <Link to="/cart" className="cart-icon">Cart</Link>
      </nav>
    </header>
  );
};

export default Header;
