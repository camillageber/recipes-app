import React from 'react';
import PropTypes from 'prop-types';

import foodContext from './FoodContext';

function Provider({ children }) {
  return (
    <foodContext.Provider value={ { nome: 'Xablau' } }>
      {children}
    </foodContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
