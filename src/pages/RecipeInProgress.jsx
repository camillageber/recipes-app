import React, { useEffect, useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ResultAPIs from '../services/combinerAPIs';

import ButtonFav from '../components/ButtonFav';
import ButtonShare from '../components/ButtonShare';
import './recipesInProgress.css';
import ButtonFinish from '../components/ButtonFinish';
import { getLocalStore, setLocalStore } from '../services/LocalStorege';
import foodContext from '../context/FoodContext';

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
  const { updateLocalStorege, checkLocalStorege } = useContext(foodContext);

  const [recipieDetails, setRecipieDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [checkboxs, setCheckboxs] = useState({});
  const [inProgressRecipes, setInProgress] = useState(getLocalStore('inProgressRecipes'));
  console.log(inProgressRecipes);

  const mount = useRef(null);
  const { location: { pathname } } = useHistory();

  const handleChange = ({ target }) => {
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

    setCheckboxs((prev) => ({ ...prev, [target.name]: !checkboxs[target.name] }));
    checkLocalStorege();
  };

  useEffect(() => {
    if (!mount.current) {
      const checkType = pathname.includes('foods') ? 'meals' : 'cocktails';
      setType(checkType);
      setId(pathname.split('/')[2]);

      mount.current = true;
    } else if (ingredients.length === 0) {
      (async () => {
        const { getById } = ResultAPIs(pathname.split('/')[1]);
        const result = await getById(id);
        setRecipieDetails(await result);
        setIngredients(getIngredients(await result));
      })();

      if (!inProgressRecipes) {
        setLocalStore('inProgressRecipes', {
          [type]: { [id]: [] },
        });
        checkLocalStorege();
      } else if (!Object.keys(inProgressRecipes[type]).includes(id)) {
        console.log('aqui');
        setLocalStore('inProgressRecipes', {
          ...inProgressRecipes,
          [type]: {
            ...inProgressRecipes[type],
            [id]: [] },
        });
        checkLocalStorege();
      }
    }
  }, [ingredients, pathname, id, inProgressRecipes, type, checkLocalStorege]);

  useEffect(() => {
    setInProgress(getLocalStore('inProgressRecipes'));
  }, [updateLocalStorege]);

  // Inicia com os checkbox selecionados
  useEffect(() => {
    if (ingredients.length > 0 && Object.keys(checkboxs).length === 0) {
      ingredients[1].forEach((ingredient) => {
        setCheckboxs((prev) => ({
          ...prev,
          [ingredient]: inProgressRecipes[type][id]?.includes(ingredient) || false,
        }));
      });
    }
  }, [checkboxs, id, inProgressRecipes, ingredients, type]);

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
                (
                  <li
                    key={ index }
                  >
                    <label
                      htmlFor={ ingredient }
                      className={ checkboxs[ingredient] }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        name={ ingredient }
                        id={ ingredient }
                        checked={ checkboxs[ingredient] }
                        onChange={ handleChange }
                      />
                      { `${ingredient} - ${ingredients[0][index]}` }
                    </label>
                  </li>
                )))}
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
          disabled={ !Object.values(checkboxs).every((check) => check) }
          id={ recipieDetails.idrecipe }
          type={ recipieDetails.alcoholic ? 'cocktails' : 'meals' }
        />
      </div>
    </>
  );
}
