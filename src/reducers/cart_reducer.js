import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    // check if the item is already in the cart
    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      // if item exists in the cart, I need to increase the amount when users add more items to cart
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          let newAmount = item.amount + amount;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return {
            ...item,
            amount: newAmount,
          };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        // to have same product but different colors
        id: id + color,
        color: color,
        name: product.name,
        image: product.images[0].url, // images property is an array
        amount: amount,
        // users can only add a certain amount of items below the amount of item's stock
        max: product.stock,
        price: product.price,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  // remove item from cart
  if (action.type === REMOVE_CART_ITEM) {
    const newCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: newCart };
  }
  // clear cart items
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  // toggle cart item amount
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });

    return { ...state, cart: tempCart };
  }
  // calculate totals
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { price, amount } = cartItem;
        total.total_items = total.total_items + amount;
        total.total_amount = total.total_amount + price * amount;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_items: total_items, total_amount: total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
