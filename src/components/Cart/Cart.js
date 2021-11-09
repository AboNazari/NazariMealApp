import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const onAddItemToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const onRemoveItemFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const onSumbitDataHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://delivery-food-app-9ef4f-default-rtdb.asia-southeast1.firebasedatabase.app/orderData.json",
      {
        method: "POST",
        body: JSON.stringify({
          order: cartCtx.items,
          userData,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearItems();
  };

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={onAddItemToCartHandler.bind(null, item)}
            onRemove={onRemoveItemFromCartHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const ModalContent = (
    <>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckOut onCancel={props.onClose} onConfirm={onSumbitDataHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );
  const submitted = (
    <div className={classes.result}>
      <p>Your Order is successfully recieved!</p>
      <p>We will contact you when your order is ready. </p>
      <p>Thank you for choosing Nazari Meals :)</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );
  const submitting = (
    <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
      Submiting your order...
    </p>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSubmitted && ModalContent}
      {!isSubmitted && isSubmitting && submitting}
      {!isSubmitting && isSubmitted && submitted}
    </Modal>
  );
};

export default Cart;
