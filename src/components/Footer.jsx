import React from 'react';
import { useHistory } from 'react-router-dom';
import Svg from './Svg';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  // const [onRedirectMeal, setOnRedirectMeal] = useState(false);
  // const [onRedirectDrink, setOnRedirectDrinkl] = useState(false);
  const history = useHistory();
  return (
    <footer data-testid="footer" className="fixed">
      <button
        type="button"
        className="food"
        onClick={ () => {
          history.push('/foods');
        } }
      >
        <Svg src={ mealIcon } testId="food-bottom-btn" />
      </button>
      <button
        type="button"
        className="drink"
        onClick={ () => {
          history.push('/drinks');
        } }
      >
        <Svg src={ drinkIcon } testId="drinks-bottom-btn" />
      </button>
      {/* { onRedirectMeal && <Redirect to="/foods" /> }
      { onRedirectDrink && <Redirect to="/drinks" /> } */}
    </footer>
  );
}
