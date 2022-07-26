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

export default function ButtonFav(props) {
  const { id, index, horizontal } = props;

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
        { ...props });
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
        data-testid={ horizontal ? `${index}-horizontal-favorite-btn` : 'favorite-btn' }
        alt=""
      />
    </button>
  );
}

ButtonFav.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  horizontal: PropTypes.bool,
};

ButtonFav.defaultProps = {
  index: -1,
  horizontal: false,
};
