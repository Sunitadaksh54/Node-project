import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../redux/selectors/cartSelectors";

function CartSummary (){
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <div>
      <p>Total Items: {items.length}</p>
      <p>Total Price: ${total.toFixed(2)}</p>
    </div>
  );
};
export default CartSummary;