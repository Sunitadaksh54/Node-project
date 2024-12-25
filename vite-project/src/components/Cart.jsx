import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import "../styles/Cart.css";

function Cart ()  {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      )}
    </div>
  );
};

export default Cart;
