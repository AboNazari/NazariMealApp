import { useRef, useState } from "react";
import classes from "./checkout.module.css";
const invalidInput = (value) => value.trim() === "";
const invalidPostalCodeCheck = (value) => value.length !== 5;
const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const [invalidForm, setInvalidForm] = useState({
    name: false,
    street: false,
    postalCode: false,
    city: false,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const invalidName = invalidInput(enteredName);
    const invalidStreet = invalidInput(enteredStreet);
    const invalidPostalCode = invalidPostalCodeCheck(enteredPostalCode);
    const invalidCity = invalidInput(enteredCity);

    const formIsInvalid =
      invalidName && invalidStreet && invalidPostalCode && invalidCity;

    setInvalidForm({
      name: invalidName,
      street: invalidStreet,
      postalCode: invalidPostalCode,
      city: invalidCity,
    });

    if (formIsInvalid) {
      return;
    }

    // send data to backend
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameInputClasses = ` ${classes.control} ${
    invalidForm.name ? classes.invalid : ""
  }`;
  const streetInputClasses = ` ${classes.control} ${
    invalidForm.street ? classes.invalid : ""
  }`;
  const postalCodeInputClasses = ` ${classes.control} ${
    invalidForm.postalCode ? classes.invalid : ""
  }`;
  const cityInputClasses = ` ${classes.control} ${
    invalidForm.city ? classes.invalid : ""
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {invalidForm.name && <p>Please Enter a Valid Name!</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {invalidForm.street && <p>Please Enter a Valid Street!</p>}
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="number" id="postal" ref={postalCodeRef} />
        {invalidForm.postalCode && (
          <p>Please Enter a Valid Postal Code (5 char long)!</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {invalidForm.city && <p>Please Enter a Valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
