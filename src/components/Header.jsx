import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Svg from './Svg';
import icon from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

export default function Header({ pageTitle }) {
  const [onRedirect, setOnRedirect] = useState(false);

  return (
    <header>
      <button
        type="button"
        onClick={ () => setOnRedirect(true) }
      >
        <Svg src={ icon } />
      </button>
      <h2 data-testid="page-title">{ pageTitle }</h2>
      { (pageTitle === 'Foods' || pageTitle === 'Drinks')
      && (
        <button
          type="button"
          data-testid="search-top-btn"
        >
          <Svg src={ search } />
        </button>) }
      { onRedirect && <Redirect to="/profile" /> }
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};
