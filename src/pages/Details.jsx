import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Svg from '../components/Svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getAllMealDetailsById } from '../services/foodAPI';

import './details.css';

export default function Details() {
  const [recipieDetails, setRecipieDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

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

  useEffect(() => {
    const { location: { pathname } } = history;
    const id = pathname.split('/')[2];
    (async () => {
      const result = await getAllMealDetailsById(id);
      setRecipieDetails(result);
      setIngredients(getIngredients(result));
    })();
  }, []);

  if (!recipieDetails) return;

  return (
    <>
      <div className="card-details">
        <img
          className="image-card"
          src={ recipieDetails.strMealThumb }
          alt="Big Mac"
        />
        <div className="card-inner">
          <div className="title-subtitle-card">
            <h1 className="title-card">{ recipieDetails.strMeal }</h1>
            <p className="category-card">{ recipieDetails.strCategory }</p>
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
                >
                  { `${ingredient} - ${ingredients[0][index]}` }
                </li>))}
            </ul>
          </div>
        </div>
        <div className="container container-instructions">
          <h2>Instructions</h2>
          <div className="container-info">
            <p>
              {recipieDetails.strInstructions}
            </p>
          </div>
        </div>
        <div className="container container-video">
          <h2>Video</h2>
          <iframe
            src={ recipieDetails.strYoutube?.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            frameBorder="0"
            allow={ `accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture` }
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
