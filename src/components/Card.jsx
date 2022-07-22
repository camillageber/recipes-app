import React from 'react';
import PropTypes from 'prop-types';
import './card.css';
import { useHistory } from 'react-router-dom';

const INDEX_DEFAULT = -1;

export default function Card({ recipethumb, recipe, idrecipe, index = INDEX_DEFAULT }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <button
      type="button"
      className="card"
      onClick={ () => history.push(`/${pathname.replace('/', '')}/${idrecipe}`) }
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
