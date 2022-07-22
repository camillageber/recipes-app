import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Svg from './Svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function ButtonFav({ idrecipe,
  alcoholic, area, category, recipe, recipethumb }) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favoriteRecipes) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const isFavorite = favoriteRecipes?.some((recipes) => recipes.id === idrecipe);
  const [heart, setHeart] = useState(isFavorite);
  const handleClick = () => {
    if (!heart) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteRecipes,
          { id: idrecipe,
            type: alcoholic ? 'drink' : 'food',
            nationality: area === null ? '' : area,
            category,
            alcoholicOrNot: alcoholic === null ? '' : alcoholic,
            name: recipe,
            image: recipethumb }]));
    } else {
      const newArray = favoriteRecipes.filter((recipes) => recipes.id !== idrecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    }
    setHeart(!heart);
  };
  return (
    <button
      type="button"
      onClick={ () => handleClick() }
    >
      <Svg
        src={ heart ? blackHeartIcon
          : whiteHeartIcon }
        testId="favorite-btn"
      />
    </button>
  );
}

ButtonFav.propTypes = {
  idrecipe: PropTypes.string.isRequired,
  alcoholic: PropTypes.string,
  area: PropTypes.string,
  recipe: PropTypes.string.isRequired,
  recipethumb: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

ButtonFav.defaultProps = {
  area: null,
  alcoholic: null,
};
