import PropTypes from 'prop-types';
import React, { useEffect, useRef, useContext } from 'react';
// import { useHistory } from 'react-router-dom';

import foodContext from '../context/FoodContext';

import './buttonStart.css';

function ButtonFinish(props) {
  const { id, type, disabled } = props;

  const { upadateLocalStore, checkLocalStorege } = useContext(foodContext);

  const mount = useRef(null);

  // const { push, location: { pathname } } = useHistory();

  const handleClick = () => {
    checkLocalStorege();
  };

  useEffect(() => {
    if (!mount.current) { // ComponenteDidMount

    } else { // ComponenteDidUpdate

    }
  }, [id, type, upadateLocalStore]);

  return (

    <button
      className="btn-start"
      type="button"
      onClick={ handleClick }
      data-testid="finish-recipe-btn"
      disabled={ disabled }
    >
      Finish Recipe
    </button>
  );
}

ButtonFinish.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ButtonFinish;
