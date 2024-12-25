import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import "../styles/ProoductItem.css";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="product-item">
      <img src={props.product.thumbnail} alt={props.product.title} />
      <h3>{props.product.title}</h3>
      <p>${props.product.price}</p>
      <button onClick={() => dispatch(addToCart(props.product))}>Add to Cart</button>
      <Link to={`/product/${props.product.id}`} className="details-button">Details</Link>
    </div>
  );
};

export default ProductItem;
