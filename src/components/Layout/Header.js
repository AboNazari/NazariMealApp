import meals from "../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h2>Nazari Meals</h2>
        <HeaderCartButton onClick={props.onCartShow} />
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="a table full of delicious meals!" />
      </div>
    </>
  );
};

export default Header;
