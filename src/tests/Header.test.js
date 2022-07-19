import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import FoodProvider from '../context/FoodProvider';

describe('Testando o header', () => {
  test('Ao clicar no botão perfil a pessoa é redirecionada para o perfil', () => {
    const {history} = renderWithRouter(<FoodProvider><Header pageTitle='Profile'/></FoodProvider>);
    const buttonToProfile = screen.getByAltText(/icon/i);
    expect(buttonToProfile).toBeInTheDocument();
    
    userEvent.click(buttonToProfile);

    const {location: {pathname}} = history;
    history.push('/Profile');
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });

  test('testa botão de busca', () => {
    const {history} = renderWithRouter(<FoodProvider><Header pageTitle='Foods'/></FoodProvider>);
    const buttonSearch = screen.getByTestId('search-top-btn');

    userEvent.click(buttonSearch);
    const {location: {pathname}} = history;
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
  });
});
