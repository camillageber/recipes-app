import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import FoodProvider from './context/FoodProvider';

ReactDOM.render(
  <BrowserRouter>
    <FoodProvider>
      <App />
    </FoodProvider>
  </BrowserRouter>, document.getElementById('root'),
);

serviceWorker.unregister();
