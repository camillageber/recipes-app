import React, { useState } from 'react';
import PropTypes from 'prop-types';

import foodContext from './FoodContext';

function Provider({ children }) {
  const [searchBar, setSearchBar] = useState({ input: 'a', radio: 'f' });

  function handleSearchBar({ inputValue, radioValue }) {
    setSearchBar({ input: inputValue, radio: radioValue });
  }

  const state = {
    handleSearchBar, searchBar,
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
