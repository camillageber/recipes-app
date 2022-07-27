import React from 'react';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import { exampleDrinks, exampleMeals, oneMeal, oneDrink } from './mocks/mockDetailsApi'
describe('Testa a página de detalhes das receitas', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />)
    history.push('foods/52977')
    delete window.location
    window.location = new URL('http://localhost:3000/foods/52977');
    // https://www.w3schools.com/js/js_window_location.asp
    // https://nodejs.org/api/url.html#the-whatwg-url-api
    global.fetch = jest.fn((endpoint) =>
      Promise.resolve({
        json: () => {
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
            return Promise.resolve(oneMeal);
          }
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') {
            return Promise.resolve(oneDrink);
          }
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
            return Promise.resolve(exampleDrinks);
          }
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
            return Promise.resolve(exampleMeals);
          }
        }
      }));
  });
  test('se o título da receita "Corba" está na tela', async () => {
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument(); 
  })
  test('se a categoria da receita se encontra na tela', async () => {
      const recipeCategory = await screen.findByTestId('recipe-category');
      expect(recipeCategory).toBeInTheDocument();
  })
  test('se os ingredientes estão na tela', async () => {
      const elIgredients = await screen.findByRole('heading', { name: 'Ingredients' });
      expect(elIgredients).toBeInTheDocument();
})
test('se as instruções estão na tela', async () => {
    const elInstructions = await screen.findByTestId('instructions')
    expect(elInstructions).toBeInTheDocument();
})
test('se o vídeo de preparo está na tela', async () => {
    const elVideo = await screen.findByTestId('video');
    expect(elVideo).toBeInTheDocument();
})
test('se o carrosel com a lista de recomendações de bebidas está na tela', async () => {
    const carroselList = await screen.findAllByAltText('img');
    expect(carroselList).toHaveLength(6);
})
test('se o botão de compartilhar a receita está na tela', async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  // https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Promises
    const buttonShare = screen.getByTestId("share-btn");
    expect(buttonShare).toBeInTheDocument();
})
test('se existe o botão de favoritar e se ao clicar nele a receita é favoritada ou desfavoritada', async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  // https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Promises
     const buttonFav = screen.getByTestId("favorite-btn");
     expect(buttonFav).toBeInTheDocument();
     expect(buttonFav.getAttribute('src')).toContain('whiteHeartIcon'); 
     // https://dev.to/carloscne/criando-testes-para-eventos-html-no-react-2a2p
    //  https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
     
     userEvent.click(buttonFav);
     expect(buttonFav.getAttribute('src')).toContain('blackHeartIcon'); 
 
     userEvent.click(buttonFav);
     expect(buttonFav.getAttribute('src')).toContain('whiteHeartIcon');
})
// test('se existe o botão "start recipe" e se ao clicar nele, a página é redirecionada para a receita em progresso', async () => {
//     const buttonStart = screen.getByRole('button', { name: /start recipe/i });
//     expect(buttonStart).toBeInTheDocument();
//     userEvent.click(buttonStart);
//     expect(history.location.pathname).toContain('foods/52977/in-progress');
// })
})