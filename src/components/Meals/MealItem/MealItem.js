import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

const MealItem = (props) => {
  const cartCTX = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const onCartAddAmountHandler = (amount) => {
    cartCTX.addItem({
      id: props.id,
      amount: amount,
      price: props.price,
      name: props.name,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        {" "}
        <MealItemForm
          id={props.id}
          onCartAddAmount={onCartAddAmountHandler}
        />{" "}
      </div>
    </li>
  );
};

export default MealItem;
