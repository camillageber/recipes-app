import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Login } />
      <Route path="/drinks" component={ Login } />
      <Route path="/foods/:id" component={ Login } />
      <Route path="/drinks/:id" component={ Login } />
      <Route path="/foods/:id/in-progress" component={ Login } />
      <Route path="/drinks/:id/in-progress" component={ Login } />
      <Route path="/profile" component={ Login } />
      <Route path="/done-recipes" component={ Login } />
      <Route path="/favorite-recipes" component={ Login } />
    </Switch>
  );
}

export default App;
