import React from 'react';

export default function Search() {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <label htmlFor="ingredient-search">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search"
        />
      </label>
      <label htmlFor="name-search">
        <input type="radio" data-testid="name-search-radio" id="name-search" />
      </label>
      <label htmlFor="letter-search">
        <input type="radio" data-testid="first-letter-search-radio" id="letter-search" />
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}
