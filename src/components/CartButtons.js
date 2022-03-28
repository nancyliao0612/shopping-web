import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";

const CartButtons = () => {
  const { total_items } = useCartContext();
  const { closeSidebar } = useProductsContext();
  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        <span>Cart</span>
        <span className="cart-container">
          <AiOutlineShoppingCart />
          <span className="cart-value">{total_items}</span>
        </span>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  // width: 100px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 2rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  }
`;
export default CartButtons;
