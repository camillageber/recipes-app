import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const INDEX_DEFAULT = -1;

export default function ButtonShare({ index = INDEX_DEFAULT, type, id }) {
  const [copied, setCopied] = useState(false);

  const oneSec = 1000;
  const url = `${window.document.location.origin}/${type}/${id}`;
  const handleClick = () => {
    copy(url);
    setCopied(true);
    setTimeout(() => setCopied(false), oneSec);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleClick() }

      >
        <img
          src={ shareIcon }
          testId="share-btn"
          data-testid={ index >= 0 ? `${index}-horizontal-share-btn` : '' }
          alt=""
        />
      </button>
      { copied && <p>Link copied!</p> }
    </div>
  );
}

ButtonShare.propTypes = {
  index: PropTypes.number,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

ButtonShare.defaultProps = {
  index: -1,
};
