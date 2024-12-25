import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART: {
        const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
        if (itemIndex >= 0) {
          // If item exists, increase quantity
          const updatedItems = [...state.items];
          updatedItems[itemIndex].quantity += 1;
          return { ...state, items: updatedItems };
        }
        // If item doesn't exist, add it with a quantity of 1
        return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
      }
    case REMOVE_FROM_CART:
      return {
        ...state, items: state.items.filter((item) => item.id !== action.payload),
      };
      case "DECREASE_QUANTITY":
  return {
    ...state, items: state.items.map((item) =>
      item.id === action.payload
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ),
  };
    default:
      return state;
  }
};

export default cartReducer;
