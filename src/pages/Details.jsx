import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import Svg from '../components/Svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useResultAPIs from '../services/combinerAPIs';

import './details.css';

const getIngredients = (recipe) => {
  const newIngredients = Object.entries(recipe)
    .filter((key) => +(key[0].slice(+('-1'))) && key[1])
    .reduce((acc, current, index, src) => {
      const [, value] = current;
      if (index + 1 > src.length / 2) {
        acc[0].push(value);
      } else {
        acc[1].push(value);
      }
      return acc;
    }, [[], []]);
  return newIngredients;
};

export default function Details() {
  const [recipieDetails, setRecipieDetails] = useState({});
  const [suggestionsRecipes, setSuggestionsRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathRecomendation = pathname.split('/')[1] === 'foods' ? 'drinks' : 'foods';
  const { getById } = useResultAPIs(pathname.split('/')[1]);
  const { getByName } = useResultAPIs(pathRecomendation);

  useEffect(() => {
    const id = pathname.split('/')[2];
    (async () => {
      const result = await getById(id);
      setRecipieDetails(await result);
      setIngredients(getIngredients(await result));
      const resultRecomendation = await getByName('');
      setSuggestionsRecipes(resultRecomendation
        .filter((recipe, index) => index < +('6')));
    })();
  }, [getById, getByName, pathname]);

  console.log(Object.keys(recipieDetails).length > 0);
  if (Object.keys(recipieDetails).length === 0) return '';

  return (
    <>
      <div className="card-details">
        <img
          className="image-card"
          data-testid="recipe-photo"
          src={ recipieDetails.recipethumb }
          alt="Big Mac"
        />
        <div className="card-inner">
          <div className="title-subtitle-card">
            <h1
              className="title-card"
              data-testid="recipe-title"
            >
              { recipieDetails.recipe }

            </h1>
            <p
              className="category-card"
              data-testid="recipe-category"
            >
              { recipieDetails.alcoholic || recipieDetails.category }
            </p>
          </div>
          <div className="icons-card">
            <Svg src={ shareIcon } />
            <Svg src={ whiteHeartIcon } />
          </div>
        </div>

      </div>
      <div className="content-wrapper">
        <div className="container container-ingredient">
          <h2>Ingredients</h2>
          <div className="container-info">
            <ul>
              {ingredients.length > 0 && ingredients[1].map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { `${ingredient} - ${ingredients[0][index]}` }
                </li>))}
            </ul>
          </div>
        </div>
        <div className="container container-instructions">
          <h2>Instructions</h2>
          <div className="container-info">
            <p
              data-testid="instructions"
            >
              {recipieDetails.inuctions}
            </p>
          </div>
        </div>
        {recipieDetails.youtube && (
          <div className="container container-video">
            <h2>Video</h2>
            <iframe
              data-testid="video"
              src={ recipieDetails.youtube?.replace('watch?v=', 'embed/') }
              title="YouTube video player"
              frameBorder="0"
              allow={ `accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture` }
              allowFullScreen
            />
          </div>
        )}
        <div className="recomendation-cards">
          {suggestionsRecipes.length > 0 && (
            suggestionsRecipes.map((recipe, index) => (
              <section
                className="item"
                key={ recipe.idrecipe }
                data-testid={ `${index}-recomendation-card` }
              >
                <img src={ recipe.recipethumb } alt="img" />
                <p data-testid={ `${index}-recomendation-title` }>
                  {recipe.recipe}
                </p>
              </section>
            ))
          ) }
        </div>
      </div>
    </>
  );
}
