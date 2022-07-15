import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import foodContext from './FoodContext';
import { getFoodBy } from '../services/foodAPI';

function Provider({ children }) {
  const [searchBar, setSearchBar] = useState({ input: '', radio: '' });
  const [resultSearchBar, setResultSearchBar] = useState([]);

  const handleSearchBar = ({ inputValue, radioValue }) => {
    setSearchBar({ input: inputValue, radio: radioValue });
  };

  const state = {
    handleSearchBar, resultSearchBar,
  };

  useEffect(() => {
    if (searchBar.input.length > 1 && searchBar.radio === 'f') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      (async () => {
        setResultSearchBar(await getFoodBy(searchBar.input, searchBar.radio));
      })();
    }
  }, [searchBar]);

  return (
    <foodContext.Provider value={ state }>
      {children}
    </foodContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
