import React, { useContext, useEffect, useState } from 'react';

import CardFav from '../components/CardFav';
import Header from '../components/Header';
import foodContext from '../context/FoodContext';
import { getLocalStore } from '../services/LocalStorege';

import './FavoriteRecipes.css';

function FavoriteRecipes() {
  const { updateLocalStorege } = useContext(foodContext);
  const [recipes, setRecipes] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');

  console.log(typeFilter, 'typefilter');
  console.log(recipes, 'receitas');

  const handleClick = (type) => {
    setTypeFilter(type);
  };

  useEffect(() => {
    const favoriteRecipes = getLocalStore('favoriteRecipes');
    if (favoriteRecipes) {
      setRecipes(favoriteRecipes);
    }
  }, [updateLocalStorege]);

  return (
    <>
      <Header pageTitle="Favorite Recipes" color="red" />
      <div className="buttons-filter">
        <button
          type="button"
          onClick={ () => handleClick('') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => handleClick('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>
        <button
          type="button"
          onClick={ () => handleClick('food') }
          data-testid="filter-by-food-btn"
        >
          foods
        </button>
      </div>
      <div className="recipes">
        {recipes
          .filter((recipe) => {
            console.log(recipe.type.includes(typeFilter), recipe.type);
            return recipe.type.includes(typeFilter);
          })
          .map((recipe, index) => (
            <CardFav
              index={ index }
              testid={ `${index}-recipe-card` }
              data={ recipe }
              key={ recipe.id }
            />
          ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
