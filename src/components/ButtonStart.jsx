import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';

import { getLocalStore, setLocalStore } from '../services/LocalStorege';

import './buttonStart.css';

const START_RECIPES = 'Start Recipe';

function ButtonStart(props) {
  const { id, type } = props;
  const [buttonValue, setButtonValue] = useState(START_RECIPES);
  const [
    inProgressRecipes,

  ] = useState(getLocalStore('inProgressRecipes') || {});

  // const { push, location: { pathname } } = useHistory();

  const handleClick = () => {
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
    // push(`${pathname}/in-progress`);
  };

  useEffect(() => {
    const isInProgress = Object.keys(inProgressRecipes[type]).includes(id);
    if (isInProgress) {
      setButtonValue('Continue Recipe');
    } else {
      setButtonValue(START_RECIPES);
    }
  }, [id, inProgressRecipes, type]);

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
