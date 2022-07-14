import React from 'react';
import PropTypes from 'prop-types';

import icon from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

export default function Header({ pageTitle = 'Foods' }) {
  return (
    <header>
      <img src={ icon } data-testid="profile-top-btn" alt="icon" />
      <h2 data-testid="page-title">{ pageTitle }</h2>
      { (pageTitle === 'Foods' || pageTitle === 'Drinks')
      && <img src={ search } alt="search" data-testid="search-top-btn" /> }
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};
