import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../store/cart-context";
const HeaderCartButton = (props) => {
  const cartCTX = useContext(CartContext);
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const { items } = cartCTX;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);
    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const buttonClass = `${classes.button} ${
    buttonIsHighlighted ? classes.bump : ""
  }`;
  return (
    <button className={buttonClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <AiOutlineShoppingCart />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
