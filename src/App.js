import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
// import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import DetailsProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodProvider from './context/FoodProvider';

import './App.css';
import Card from './components/Card';

function App() {
  return (
    <FoodProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Home } />
        <Route exact path="/drinks" component={ Home } />
        <Route path="/foods/:id/in-progress" component={ DetailsProgress } />
        <Route path="/drinks/:id/in-progress" component={ DetailsProgress } />
        <Route path="/foods/:id" component={ RecipeDetails } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route exect path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/test" component={ Card } />
      </Switch>
    </FoodProvider>
  );
}

export default App;
