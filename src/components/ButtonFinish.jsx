import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

import './buttonStart.css';

function ButtonFinish({ disabled }) {
  const { push } = useHistory();

  const handleClick = () => {
    push('/done-recipes');
  };

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
  disabled: PropTypes.bool.isRequired,
};

export default ButtonFinish;
