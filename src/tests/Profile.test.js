import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a tela Profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
  })
  test('Verifica se há o título "Profile" na tela', async () => {   
    renderWithRouter(<App />, '/profile');
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    
    const titleEl = await screen.findByRole('heading', { name: /profile/i, level: 1 });
    expect(titleEl).toBeInTheDocument();
  });

  test('Verifica se há o botão "Done Recipes" na tela e redireciona para a página correta', async () => {
    const {history} = renderWithRouter(<App />, '/profile');

    const btnDoneRecipes = await screen.findByRole('button', { name: /done recipes/i });
    expect(btnDoneRecipes).toBeInTheDocument();
    userEvent.click(btnDoneRecipes);
    const path = history.location.pathname;
    // console.log(path)
    expect(path).toEqual('/done-recipes')
  });

  test('Testa botão Done Recipes', async () => {
   renderWithRouter(<App />, '/profile');

    const buttonDone = await screen.findByTestId('profile-done-btn');
    userEvent.click(buttonDone);

    const titleEl = await screen.findByRole('heading', { name: /donerecipes/i})
    expect(titleEl).toBeInTheDocument();
  });

  test('Testa botão Favorite Recipes', async () => {
  renderWithRouter(<App />, '/profile');

    const buttonDone = await screen.findByTestId('profile-favorite-btn');
    userEvent.click(buttonDone);

    const titleEl = await screen.findByRole('heading', { name: /favoriterecipes/i})
    expect(titleEl).toBeInTheDocument();
  });

  test('Testa o botão "Logout"', async () => {
  renderWithRouter(<App />, '/profile');
       
    const buttonLogout = await screen.findByTestId("profile-logout-btn");
    userEvent.click(buttonLogout);
    const cleanedLocalStorage = localStorage.getItem('user');
    expect(cleanedLocalStorage).toBe(null);
    const returnToLogin = await screen.findByTestId('email-input');
    expect(returnToLogin).toBeInTheDocument();
})

});