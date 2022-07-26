import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const INDEX_DEFAULT = -1;

export default function ButtonShare({ index = INDEX_DEFAULT, type, id, horizontal }) {
  const [copied, setCopied] = useState(false);

  const type2 = ['foods', 'food'].includes(type) ? 'foods' : 'drinks';

  const oneSec = 1000;
  const url = `${window.document.location.origin}/${type2}/${id}`;
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
          data-testid={ horizontal ? `${index}-horizontal-share-btn` : 'share-btn' }
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
  horizontal: PropTypes.bool,
};

ButtonShare.defaultProps = {
  index: -1,
  horizontal: false,
};
