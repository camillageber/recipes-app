import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './card.css';
import { useHistory } from 'react-router-dom';
import foodContext from '../context/FoodContext';

const INDEX_DEFAULT = -1;

export default function Card({ recipethumb, recipe, idrecipe, index = INDEX_DEFAULT }) {
  const { typeResult } = useContext(foodContext);
  const history = useHistory();

  return (
    <button
      type="button"
      className="card"
      onClick={ () => history.push(`/${typeResult}/${idrecipe}`) }
      data-testid={ index === INDEX_DEFAULT ? '' : `${index}-recipe-card` }
    >
      <img
        src={ recipethumb }
        alt="imagem da receita"
        data-testid={ index === +('-1') ? '' : `${index}-card-img` }
      />
      <div>
        <h2
          data-testid={ index === +('-1') ? '' : `${index}-card-name` }
        >
          {recipe}
        </h2>
      </div>
    </button>
  );
}

Card.propTypes = {
  recipe: PropTypes.string.isRequired,
  recipethumb: PropTypes.string.isRequired,
  idrecipe: PropTypes.string.isRequired,
  index: PropTypes.number,
};

Card.defaultProps = {
  index: -1,
};
