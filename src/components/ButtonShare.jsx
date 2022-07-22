import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Svg from './Svg';
import shareIcon from '../images/shareIcon.svg';

export default function ButtonShare() {
  const [copied, setCopied] = useState(false);

  const oneSec = 1000;
  const url = window.document.location.href;
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
        <Svg
          src={ shareIcon }
          testId="share-btn"
        />
      </button>
      { copied && <p>Link copied!</p> }
    </div>
  );
}
