import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [mealOptions, setMealOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fectchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://delivery-food-app-9ef4f-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Faild To fetch Data!");
      }
      const data = await response.json();

      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: parseInt(data[key].price),
        });
      }
      setMealOptions(loadedData);
      setIsLoading(false);
    };
    fectchData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <p className={classes.loadingMeals}>Loading...</p>;
  }

  if (httpError) {
    return (
      <section>
        <p className={classes.hasError}> {httpError}</p>
      </section>
    );
  }

  const meals = mealOptions.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
