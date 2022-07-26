import React, { useContext, useEffect, useState } from 'react';

import CardFav from '../components/CardFav';
import Header from '../components/Header';
import foodContext from '../context/FoodContext';
import { getLocalStore, setLocalStore } from '../services/LocalStorege';

import './FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const { updateLocalStorege } = useContext(foodContext);
  const [recipes, setRecipes] = useState([]);
  const [recipesFiltred, setRecipesFiltred] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');

  const handleClick = (type) => {
    if (typeFilter === type) {
      setTypeFilter('all');
    } else {
      setTypeFilter(type);
    }
  };

  useEffect(() => {
    const filtred = recipes
      .filter((recipe) => typeFilter === 'all' || recipe.type === typeFilter);
    setRecipesFiltred(filtred);
  }, [recipes, typeFilter]);

  useEffect(() => {
    const favoriteRecipes = getLocalStore('favoriteRecipes');
    if (!favoriteRecipes) {
      setLocalStore('favoriteRecipes', []);
      setRecipes([]);
    } else {
      setRecipes(favoriteRecipes);
    }
  }, [updateLocalStorege]);

  return (
    <>
      <Header pageTitle="Favorite Recipes" color="red" />
      <div className="buttons-filter">
        <button
          type="button"
          onClick={ () => handleClick('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => handleClick('drinks') }
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>
        <button
          type="button"
          onClick={ () => handleClick('foods') }
          data-testid="filter-by-food-btn"
        >
          foods

        </button>
      </div>
      <div className="recipes">
        {recipesFiltred.length > 0 && recipesFiltred.map((recipe, index) => (
          <CardFav
            index={ index }
            testid={ `${index}-recipe-card` }
            { ...recipe }
            key={ recipe.id }
          />
        ))}
      </div>
    </>
  );
}
