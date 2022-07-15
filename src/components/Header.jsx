import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Svg from './Svg';
import icon from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import Search from './Search';

export default function Header({ pageTitle }) {
  const [onRedirect, setOnRedirect] = useState(false);
  const [togglesearch, setToggleSearch] = useState(false);

  return (
    <header>
      <button
        type="button"
        onClick={ () => setOnRedirect(true) }
      >
        <Svg src={ icon } testId="profile-top-btn" />
      </button>
      <h2 data-testid="page-title">{ pageTitle }</h2>
      { (pageTitle === 'Foods' || pageTitle === 'Drinks')
      && (
        <button
          type="button"
          onClick={ () => setToggleSearch(!togglesearch) }
        >
          <Svg src={ search } testId="search-top-btn" />
        </button>) }
      { onRedirect && <Redirect to="/profile" /> }
      {togglesearch && <Search />}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};
