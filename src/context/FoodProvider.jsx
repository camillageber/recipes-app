import React, { useState } from 'react';
import PropTypes from 'prop-types';

import foodContext from './FoodContext';

function Provider({ children }) {
  const [searchBar, setSearchBar] = useState({ input: '', radio: '' });
  const [filterCategory, setFilterCategory] = useState('');
  const [updateLocalStorege, setUpdateLocalStorege] = useState(false);

  const checkLocalStorege = () => {
    setUpdateLocalStorege(!updateLocalStorege);
  };

  const handleSearchBar = ({ inputValue, radioValue }) => {
    setSearchBar({ input: inputValue, radio: radioValue });
  };

  const toggleFilterCategory = (category) => {
    if (filterCategory === category) {
      setFilterCategory('');
    } else {
      setFilterCategory(category);
    }
  };

  const state = {
    handleSearchBar,
    toggleFilterCategory,
    checkLocalStorege,
    updateLocalStorege,
    filterCategory,
    searchBar,
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
