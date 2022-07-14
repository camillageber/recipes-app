import React from 'react';
import PropTypes from 'prop-types';

export default function Svg({ src }) {
  return <img src={ src } alt="icon" />;
}

Svg.propTypes = {
  src: PropTypes.string.isRequired,
};
