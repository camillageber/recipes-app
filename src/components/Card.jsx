import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './card.css';
import { useHistory } from 'react-router-dom';
import foodContext from '../context/FoodContext';

const INDEX_DEFAULT = -1;

export default function Card({ strMealThumb, strMeal, idMeal, index = INDEX_DEFAULT }) {
  const { typeResult } = useContext(foodContext);
  const history = useHistory();

  return (
    <button
      type="button"
      className="card"
      onClick={ () => history.push(`/${typeResult}/${idMeal}`) }
      data-testid={ index === INDEX_DEFAULT ? '' : `${index}-recipe-card` }
    >
      <img
        src={ strMealThumb }
        alt="imagem da receita"
        data-testid={ index === +('-1') ? '' : `${index}-card-img` }
      />
      <div>
        <h2
          data-testid={ index === +('-1') ? '' : `${index}-card-name` }
        >
          {strMeal}
        </h2>
      </div>
    </button>
  );
}

Card.propTypes = {
  strMeal: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  idMeal: PropTypes.string.isRequired,
  index: PropTypes.number,
};

Card.defaultProps = {
  index: -1,
};
