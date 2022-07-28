import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import ButtonShare from './ButtonShare';
import ButtonFav from './ButtonFav';

import './cardFav.css';

function CardFav({ data, index, testid }) {
  const {
    id, name, image,
    category, nationality,
    alcoholicOrNot, type } = data;
  const type2 = 'foods'.includes(type) ? 'foods' : 'drinks';

  return (
    <div className="cardFav" data-testid={ testid }>
      <Link
        to={ `/${type2}/${id}` }

      >
        <img
          src={ image }
          alt="imagem da receita"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="wrapper">
        <div>

          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            {alcoholicOrNot || `${nationality} - ${category}`}

          </h3>
          <Link
            to={ `/${type2}/${id}` }
          >
            <h2 data-testid={ `${index}-horizontal-name` }>
              {name}
            </h2>
          </Link>
        </div>
        <div className="buttons">
          <ButtonShare
            horizontal
            id={ id }
            type={ type }
            index={ index }
          />
          <ButtonFav
            horizontal
            index={ index }
            { ...data }
          />
        </div>
      </div>
    </div>
  );
}

CardFav.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  testid: PropTypes.string,
  index: PropTypes.number.isRequired,
};

CardFav.defaultProps = {
  testid: '',
};

export default CardFav;
