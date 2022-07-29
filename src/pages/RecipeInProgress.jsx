import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ResultAPIs from '../services/combinerAPIs';

import ButtonFav from '../components/ButtonFav';
import ButtonShare from '../components/ButtonShare';
import './details.css';
import ButtonFinish from '../components/ButtonFinish';
import { getLocalStore, setLocalStore } from '../services/LocalStorege';

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

export default function RecipeInProgress() {
  const [recipieDetails, setRecipieDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [id, setId] = useState('');
  const [checkboxs, setCheckboxs] = useState({});

  const mount = useRef(null);
  const { location: { pathname } } = useHistory();

  const handleChange = ({ target }) => {
    const type = pathname.includes('foods') ? 'meals' : 'cocktails';
    const inProgressRecipes = getLocalStore('inProgressRecipes');
    if (target.checked) {
      const newInProgress = {
        ...inProgressRecipes,
        [type]: {
          ...inProgressRecipes[type],
          [id]: [...inProgressRecipes[type][id], target.name],
        },
      };
      setLocalStore('inProgressRecipes', newInProgress);
    } else {
      const newInProgress = {
        ...inProgressRecipes,
        [type]: {
          ...inProgressRecipes[type],
          [id]: inProgressRecipes[type][id]
            .filter((ingredient) => ingredient !== target.name),
        },
      };
      setLocalStore('inProgressRecipes', newInProgress);
    }

    setCheckboxs({ ...checkboxs, [target.name]: !checkboxs[target.name] });
  };

  useEffect(() => {
    if (!mount.current) {
      setId(pathname.split('/')[2]);
      mount.current = true;
    } else {
      (async () => {
        const { getById } = ResultAPIs(pathname.split('/')[1]);
        const result = await getById(id);
        setRecipieDetails(await result);
        setIngredients(getIngredients(await result));
      })();
    }
  }, [id, pathname]);

  if (Object.keys(recipieDetails).length === 0) return '';

  return (
    <>
      <div className="card-details">
        <img
          className="image-card"
          data-testid="recipe-photo"
          src={ recipieDetails.recipethumb }
          alt={ `receita ${recipieDetails.recipe}` }
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
            <ButtonShare
              type={ recipieDetails.alcoholic ? 'drinks' : 'foods' }
              id={ recipieDetails.idrecipe }
            />
            <ButtonFav
              alcoholicOrNot={ recipieDetails.alcoholic || '' }
              category={ recipieDetails.category }
              id={ recipieDetails.idrecipe }
              image={ recipieDetails.recipethumb }
              name={ recipieDetails.recipe }
              nationality={ recipieDetails.area || '' }
              type={ recipieDetails.alcoholic ? 'drink' : 'food' }
            />
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
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    name={ ingredient }
                    value={ checkboxs[ingredient] }
                    onChange={ handleChange }
                  />
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
        <ButtonFinish
          id={ recipieDetails.idrecipe }
          type={ recipieDetails.alcoholic ? 'cocktails' : 'meals' }
        />
      </div>
    </>
  );
}
