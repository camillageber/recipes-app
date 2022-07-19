import React, { useState } from 'react';
import PropTypes from 'prop-types';

import foodContext from './FoodContext';

function Provider({ children }) {
  const [searchBar, setSearchBar] = useState({ input: '', radio: '' });
  const [typeResult, setTypeResult] = useState('foods');

  function handleSearchBar({ inputValue, radioValue }) {
    setSearchBar({ input: inputValue, radio: radioValue });
  }

  const state = {
    handleSearchBar,
    setTypeResult,
    searchBar,
    typeResult,
  };

  return (
    <foodContext.Provider value={ { ...state } }>
      {children}
    </foodContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
