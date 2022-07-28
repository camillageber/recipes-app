import React from 'react';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'

const mockLocalStorege = [{ alcoholicOrNot: '', category: 'Side', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', name: 'Corba', nationality: 'Turkish', type: 'foods', id: '52977' }, { alcoholicOrNot: 'Optional alcohol', category: 'Ordinary Drink', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg', name: 'GG', nationality: '', type: 'drink', id: '15997' }];

describe('Testes da página FavoriteRecipes', () => {

  it('Se encontrada as duas receitas favoritadas', async () => {
    const { history } = renderWithRouter(<App />, '/foods')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorege))
    history.push('/favorite-recipes')

    const corbaMeal = await screen.findByRole('heading', {
      name: /corba/i
    })
    expect(corbaMeal).toBeInTheDocument();
    const ggDrink = await screen.findByRole('heading', {
      name: /gg/i
    })
    expect(ggDrink).toBeInTheDocument();
    
  })
  it('Se filtra somente por comida', async () => {
    const { history } = renderWithRouter(<App />, '/foods')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorege))
    history.push('/favorite-recipes')

    const corbaMeal = await screen.findByRole('heading', {
      name: /corba/i
    })
    expect(corbaMeal).toBeInTheDocument();
    
    const ggDrink = await screen.findByRole('heading', {
      name: /gg/i
    })
    expect(ggDrink).toBeInTheDocument();
    
    const btnFilterFood = await screen.findByRole('button', {
      name: /foods/i
    })
    expect(btnFilterFood).toBeInTheDocument();
    userEvent.click(btnFilterFood);
    
    expect(corbaMeal).toBeInTheDocument();
    expect(ggDrink).not.toBeInTheDocument();
  })

  it('Se filtra somente por bebidas', async () => {
    const { history } = renderWithRouter(<App />, '/foods')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorege))
    history.push('/favorite-recipes')

    const corbaMeal = await screen.findByRole('heading', {
      name: /corba/i
    })
    expect(corbaMeal).toBeInTheDocument();
    
    const ggDrink = await screen.findByRole('heading', {
      name: /gg/i
    })
    expect(ggDrink).toBeInTheDocument();
    
    const btnFilterDrink = await screen.findByRole('button', {
      name: /drinks/i
    })
    expect(btnFilterDrink).toBeInTheDocument();
    userEvent.click(btnFilterDrink);
    
    expect(corbaMeal).not.toBeInTheDocument();
    expect(ggDrink).toBeInTheDocument();
  })

  it('Se ao clicar em all remove todos filtros', async () => {
    const { history } = renderWithRouter(<App />, '/foods')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorege))
    history.push('/favorite-recipes')

    const corbaMeal = await screen.findByRole('heading', {
      name: /corba/i
    })
    expect(corbaMeal).toBeInTheDocument();
    
    const ggDrink = await screen.findByRole('heading', {
      name: /gg/i
    })
    expect(ggDrink).toBeInTheDocument();
    
    const btnFilterDrink = await screen.findByRole('button', {
      name: /drinks/i
    })
    expect(btnFilterDrink).toBeInTheDocument();
    userEvent.click(btnFilterDrink);
    
    expect(corbaMeal).not.toBeInTheDocument();
    expect(ggDrink).toBeInTheDocument();
    
    const btnFilterAll = await screen.findByRole('button', {
      name: /all/i
    })
    expect(btnFilterAll).toBeInTheDocument();
    userEvent.click(btnFilterAll);

    const corbaMeala = screen.getByRole('heading', {
      name: /turkish \- side/i
    })

    expect(corbaMeala).toBeInTheDocument();
    expect(ggDrink).toBeInTheDocument();
  })
  
})