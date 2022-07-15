import React, { useState, useContext } from 'react';
import foodContext from '../context/FoodContext';

export default function Search() {
  const { handleSearchBar } = useContext(foodContext);

  const [input, setInput] = useState('');
  const [radiosButton, setRadiosButton] = useState('s');

  const handleCLick = ({ value }) => {
    setRadiosButton(value);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ input }
        onChange={ ({ target }) => setInput(target.value) }
      />
      <label htmlFor="ingredient-search">
        Ingredients
        <input
          type="radio"
          name="search-bar"
          data-testid="ingredient-search-radio"
          id="ingredient-search"
          value="i"
          onClick={ ({ target }) => handleCLick(target) }
        />
      </label>
      <label htmlFor="name-search">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          name="search-bar"
          id="name-search"
          value="s"
          onClick={ ({ target }) => handleCLick(target) }
        />
      </label>
      <label htmlFor="first-letter-search">
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="search-bar"
          id="first-letter-search"
          value="f"
          onClick={ ({ target }) => handleCLick(target) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        id="search-bar"
        onClick={ () => handleSearchBar({ inputValue: input, radioValue: radiosButton }) }
      >
        Search
      </button>
    </div>
  );
}
