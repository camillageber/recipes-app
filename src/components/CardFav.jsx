import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import ButtonShare from './ButtonShare';
import ButtonFav from './ButtonFav';

import './cardFav.css';

const INDEX_DEFAULT = -1;

function CardFav(props) {
  const { id, name, image, category, nationality, alcoholicOrNot,
    index = INDEX_DEFAULT, testId = '', type } = props;

  return (
    <div className="cardFav">

      <img
        src={ image }
        alt="imagem da receita"
        data-testid={ index === INDEX_DEFAULT ? '' : `${index}-horizontal-image` }
      />

      <div className="wrapper">
        <div>

          <h3
            data-testid={ index === INDEX_DEFAULT ? '' : `${index}-horizontal-top-text` }
          >
            {alcoholicOrNot || `${nationality} - ${category}`}

          </h3>
          <Link
            to={ `/${alcoholicOrNot ? 'drinks' : 'foods'}/${id}` }
            data-testid={ testId }
          >
            <h2 data-testid={ index === INDEX_DEFAULT ? '' : `${index}-horizontal-name` }>
              {name}
            </h2>
          </Link>
        </div>
        <div className="buttons">
          <ButtonShare
            id={ id }
            type={ type }
            index={ index }
          />
          <ButtonFav
            { ...props }
          />
        </div>
      </div>
    </div>
  );
}

CardFav.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  testId: PropTypes.string,
  type: PropTypes.string.isRequired,
};

CardFav.defaultProps = {
  index: INDEX_DEFAULT,
  testId: '',
};

export default CardFav;
