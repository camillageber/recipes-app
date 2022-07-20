import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Svg from './Svg';
import icon from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

export default function Header({ pageTitle, color }) {
  const [onRedirect, setOnRedirect] = useState(false);
  const [togglesearch, setToggleSearch] = useState(false);

  return (
    <>
      <header>
        <button
          type="button"
          className="icon"
          onClick={ () => setOnRedirect(true) }
        >
          <Svg src={ icon } testId="profile-top-btn" />
        </button>
        <h2 data-testid="page-title" className={ color } id="title">{ pageTitle }</h2>
        { (pageTitle === 'Foods' || pageTitle === 'Drinks')
      && (
        <button
          type="button"
          className="search"
          onClick={ () => setToggleSearch(!togglesearch) }
        >
          <Svg src={ search } testId="search-top-btn" />
        </button>) }
        { onRedirect && <Redirect to="/profile" /> }
      </header>
      {togglesearch && <SearchBar color={ color } />}
    </>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
