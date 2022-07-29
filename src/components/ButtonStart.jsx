import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import foodContext from '../context/FoodContext';
import { getLocalStore, setLocalStore } from '../services/LocalStorege';

import './buttonStart.css';

const START_RECIPES = 'Start Recipe';

function ButtonStart(props) {
  const { id, type } = props;

  const { upadateLocalStore, checkLocalStorege } = useContext(foodContext);

  const [buttonValue, setButtonValue] = useState(START_RECIPES);
  const [
    inProgressRecipes,
    setInProgressRecipes,
  ] = useState({});

  const mount = useRef(null);

  const { push, location: { pathname } } = useHistory();

  const handleClick = () => {
    checkLocalStorege();
    if (buttonValue === START_RECIPES) {
      const newInProgressRecipes = {
        ...inProgressRecipes,
        [type]: {
          ...inProgressRecipes[type],
          [id]: [],
        },
      };
      setLocalStore('inProgressRecipes', newInProgressRecipes);
    }
    push(`${pathname}/in-progress`);
  };

  useEffect(() => {
    if (!mount.current) { // ComponenteDidMount
      const getLocal = getLocalStore('inProgressRecipes') || {};

      setInProgressRecipes(getLocal);

      mount.current = true;
    } else { // ComponenteDidUpdate
      if (!inProgressRecipes[type]) return;
      const isInProgress = Object.keys(inProgressRecipes[type]).includes(id);

      if (isInProgress) {
        setButtonValue('Continue Recipe');
      } else {
        setButtonValue(START_RECIPES);
      }
    }
  }, [id, inProgressRecipes, type, upadateLocalStore]);

  return (

    <button
      className="btn-start"
      type="button"
      onClick={ handleClick }
      data-testid="start-recipe-btn"
    >
      {buttonValue}
    </button>
  );
}

ButtonStart.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ButtonStart;
