import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import "../styles/CartItem.css";

function CartItem (props) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={props.item.thumbnail} alt={props.item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{props.item.title}</h3>
        <p>Price: ${props.item.price}</p>
        <p>Quantity: {props.item.quantity}</p>
      </div>
      <div className="cart-item-actions">
        <button
          className="quantity-button"
          onClick={() => dispatch(addToCart(props.item))}
        >
          +
        </button>
        <button
          className="quantity-button"
          onClick={() =>
            dispatch({
              type: "DECREASE_QUANTITY",
              payload: props.item.id,
            })
          }
          disabled={props.item.quantity <= 1}
        >
          -
        </button>
        <button
          className="remove-button"
          onClick={() => dispatch(removeFromCart(props.item.id))}
          >
            Remove
          </button>
        </div>
      </div>
    );
  };
  
  export default CartItem;
