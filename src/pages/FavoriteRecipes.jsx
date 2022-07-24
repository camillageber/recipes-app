import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);

  console.log(recipes);
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      setRecipes([]);
    } else {
      setRecipes(favoriteRecipes);
    }
  }, []);

  return (
    <>
      <Header pageTitle="Favorite Recipes" color="red" />
      <div className="recipes">
        {recipes.length > 0 && recipes.map((recipe) => (
          <p key={ recipe.id }>
            {recipe.name}
          </p>
        ))}
      </div>
    </>
  );
}
