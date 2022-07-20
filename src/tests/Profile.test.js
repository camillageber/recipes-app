import React from 'react';
import Login from '../pages/Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Profile from '../pages/Profile';

describe('Testa a tela Profile', () => {
  test('Verifica se há o título "Profile" na tela', () => {
    render(<Profile />)
    const titleEl = screen.getByRole('heading', { name: /profile/i, level: 1 });
    expect(titleEl).toBeInTheDocument();

  });

  test('Verifica se há o botão "Done Recipes" na tela e redireciona para a página correta', () => {
   const {history} = renderWithRouter(<Profile />)


    const btnDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
    expect(btnDoneRecipes).toBeInTheDocument();

    userEvent.click(btnDoneRecipes);

    const path = history.location.pathname;
    console.log(path)
    
    history.push('/done-recipes')
    expect(path).toEqual('/done-recipes')

  });
});

  