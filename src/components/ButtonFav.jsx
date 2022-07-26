import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  addToList,
  getLocalStore,
  removeToList,
  setLocalStore,
} from '../services/LocalStorege';
import foodContext from '../context/FoodContext';

const INDEX_DEFAULT = -1;

export default function ButtonFav(props) {
  const { id, index = INDEX_DEFAULT, alcoholicOrNot } = props;

  const { checkLocalStorege } = useContext(foodContext);

  const [heart, setHeart] = useState(false);

  useEffect(() => {
    const favoriteRecipes = getLocalStore('favoriteRecipes');
    if (!favoriteRecipes) {
      setLocalStore('favoriteRecipes', []);
      return;
    }
    const isFavorite = favoriteRecipes.some((recipes) => recipes.id === id);
    setHeart(isFavorite);
  }, [id]);

  const handleClick = () => {
    if (!heart) {
      addToList('favoriteRecipes',
        { type: alcoholicOrNot ? 'drinks' : 'food', ...props });
    } else {
      removeToList('favoriteRecipes', id);
    }
    setHeart(!heart);
    checkLocalStorege();
  };
  return (
    <button
      type="button"
      onClick={ () => handleClick() }
    >
      <img
        src={ heart ? blackHeartIcon
          : whiteHeartIcon }
        testId="favorite-btn"
        data-testid={ index >= 0 ? `${index}-horizontal-favorite-btn` : '' }
        alt=""
      />
    </button>
  );
}

ButtonFav.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
};

ButtonFav.defaultProps = {
  index: -1,
};
