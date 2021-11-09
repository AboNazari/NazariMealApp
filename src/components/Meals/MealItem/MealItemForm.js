import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [inputIsValid, setInputIsValid] = useState(true);
  const cartAmountRef = useRef();

  const addCartAmountHandler = (event) => {
    event.preventDefault();
    const cartAmount = cartAmountRef.current.value;
    const numberCartAmount = +cartAmount;

    if (
      cartAmount.trim().length === 0 ||
      numberCartAmount > 5 ||
      numberCartAmount < 1
    ) {
      setInputIsValid(false);
      return;
    }
    props.onCartAddAmount(numberCartAmount);
  };
  return (
    <form className={classes.form} onSubmit={addCartAmountHandler}>
      <Input
        ref={cartAmountRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!inputIsValid && <p>Please Enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
