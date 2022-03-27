import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let highestPrice = action.payload.map((product) => product.price);
    highestPrice = Math.max(...highestPrice);
    // console.log(highestPrice);

    return {
      ...state,
      // to display our filtered products array in the UI - will always be changing
      filtered_products: [...action.payload],
      // will not be changed
      all_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: highestPrice,
        price: highestPrice,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  // display the products based on sort
  if (action.type === SORT_PRODUCTS) {
    const { filtered_products, sort } = state;
    let tempProducts = [...filtered_products]; // in case none of these sorts match, I still can display something

    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1; // a is going to place before b
        }
        if (a.price > b.price) {
          return 1; // a is going to place after b
        }
        return 0;
      });
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }
  // update the filters
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }
  // display the products based on filters
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];

    // text filter
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // category filter
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    // company filter
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    // colors (color is an array)
    if (color !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.colors.includes(color)
        // product.colors.find((c) => c === color)
      );
    }
    // price filter
    if (price) {
      tempProducts = tempProducts.filter((product) => product.price <= price);
    }
    if (price === 0) {
      tempProducts = [];
    }
    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }

    return { ...state, filtered_products: tempProducts };
  }
  // set filters back to the default setup
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: "all",
        company: "all",
        color: "all",
        min_price: 0,
        max_price: 309999,
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
