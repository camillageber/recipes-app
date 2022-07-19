import React from 'react';
import PropTypes from 'prop-types';

export default function Svg({ src, testId }) {
  return <img src={ src } alt="icon" data-testid={ testId } />;
}

Svg.propTypes = {
  src: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

Svg.defaultProps = {
  testId: null,
};
