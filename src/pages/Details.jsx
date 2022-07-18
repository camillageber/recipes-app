import React from 'react';
import Svg from '../components/Svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import './details.css';

export default function Details() {
  return (
    <>
      <div className="card">
        <img
          className="image-card"
          src="https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg"
          alt="Big Mac"
        />
        <div className="card-inner">
          <div className="title-subtitle-card">
            <h1 className="title-card">Big Mac </h1>
            <p className="category-card">Beef</p>
          </div>
          <div className="icons-card">
            <Svg src={ shareIcon } />
            <Svg src={ whiteHeartIcon } />
          </div>
        </div>

      </div>
      <div className="content-wrapper">
        <h2>Ingredients</h2>
        <div>
          <ul>
            <li>Minced Beef - 400g</li>
            <li>Olive Oil - 2 tbs</li>
            <li>Sesame Seed Burger Buns - 2</li>
            <li>Onion - Chopped</li>
            <li>Iceberg Lettuce - 1/4</li>
            <li>...</li>
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          <p>
            For the Big Mac sauce, combine all the ingredients in a bowl, season...
          </p>
        </div>
        <div>
          <h2>Video</h2>
          <div>player de Video</div>
        </div>
      </div>
    </>
  );
}
