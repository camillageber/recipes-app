import React, { useContext, useEffect, useState } from 'react';

import CardFav from '../components/CardFav';
import Header from '../components/Header';
import foodContext from '../context/FoodContext';
import { getLocalStore, setLocalStore } from '../services/LocalStorege';

import './FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const { updateLocalStorege } = useContext(foodContext);
  const [recipes, setRecipes] = useState([]);

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
      <div className="recipes">
        {recipes.length > 0 && recipes.map((recipe, index) => (
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
