import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import foodContext from '../context/FoodContext';

import './Header.css';

export default function Search({ color }) {
  const { handleSearchBar } = useContext(foodContext);
  const [input, setInput] = useState('');
  const [radiosButton, setRadiosButton] = useState('s');

  const handleCLick = ({ value }) => {
    setRadiosButton(value);
  };

  return (
    <div className="conteinerSearch">
      <input
        type="text"
        className="input-search"
        data-testid="search-input"
        value={ input }
        onChange={ ({ target }) => setInput(target.value) }
      />
      <div className="conteinerRadio">
        <label htmlFor="ingredient-search">
          <input
            type="radio"
            name="search-bar"
            data-testid="ingredient-search-radio"
            id="ingredient-search"
            value="i"
            onClick={ ({ target }) => handleCLick(target) }
          />
          Ingredients
        </label>
        <label htmlFor="name-search">
          <input
            type="radio"
            data-testid="name-search-radio"
            name="search-bar"
            id="name-search"
            value="s"
            onClick={ ({ target }) => handleCLick(target) }
          />
          Name
        </label>
        <label htmlFor="first-letter-search">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="search-bar"
            id="first-letter-search"
            value="f"
            onClick={ ({ target }) => handleCLick(target) }
          />
          First Letter
        </label>
      </div>
      <button
        type="button"
        className={ color }
        data-testid="exec-search-btn"
        id="search-bar"
        onClick={ () => handleSearchBar({ inputValue: input, radioValue: radiosButton }) }
      >
        Search
      </button>
    </div>
  );
}

Search.propTypes = {
  color: PropTypes.string.isRequired,
};
