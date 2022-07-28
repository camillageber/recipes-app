import React from 'react';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
describe('Testes da página Recipes', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />)
    history.push('/foods')
   });
  it('Encontra card Corba na tela', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const corbaRecipe = await screen.findByRole('heading', { name:/corba/i });
    expect(corbaRecipe).toBeInTheDocument();
    userEvent.click(corbaRecipe);
  })
  it('Encontra card Burek na tela', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const burekRecipe = await screen.findByRole('heading', { name:/burek/i });
    expect(burekRecipe).toBeInTheDocument();
    userEvent.click(burekRecipe);
  })
  
  it('Encontra card Kumpir na tela', async () => {
    const kumpirRecipe = await screen.findByRole('heading', { name:/kumpir/i });
    expect(kumpirRecipe).toBeInTheDocument();
    userEvent.click(kumpirRecipe);
  })
  it('Encontra card Tamiya na tela', async () => {
    const tamiyaRecipe = await screen.findByRole('heading', { name:/tamiya/i });
    expect(tamiyaRecipe).toBeInTheDocument();
    userEvent.click(tamiyaRecipe);
  })
  it('Encontra card dal fry na tela', async () => {
    const dalfryRecipe = await screen.findByRole('heading', { name:/dal fry/i });
    expect(dalfryRecipe).toBeInTheDocument();
    userEvent.click(dalfryRecipe);
  })
  it('Encontra card poutine na tela', async () => {
    const poutineRecipe = await screen.findByRole('heading', { name:/poutine/i });
    expect(poutineRecipe).toBeInTheDocument();
    userEvent.click(poutineRecipe);
  })
  it('Encontra card lasagne na tela', async () => {
    const lasagneRecipe = await screen.findByRole('heading', { name:/lasagne/i });
    expect(lasagneRecipe).toBeInTheDocument();
    userEvent.click(lasagneRecipe);
  })
  it('Encontra card timbits na tela', async () => {
    const timbitsRecipe = await screen.findByRole('heading', { name:/timbits/i });
    expect(timbitsRecipe).toBeInTheDocument();
    userEvent.click(timbitsRecipe);
  })
  it('Encontra card wontons na tela', async () => {
    const wontonsRecipe = await screen.findByRole('heading', { name:/wontons/i });
    expect(wontonsRecipe).toBeInTheDocument();
    userEvent.click(wontonsRecipe);
  })
  it('Encontra card kafteji na tela', async () => {
    const kaftejiRecipe = await screen.findByRole('heading', { name:/kafteji/i });
    expect(kaftejiRecipe).toBeInTheDocument();
    userEvent.click(kaftejiRecipe);
  })
  
  it('Encontra card big mac na tela', async () => {
    const bigmacRecipe = await screen.findByRole('heading', { name:/big mac/i });
    expect(bigmacRecipe).toBeInTheDocument();
    userEvent.click(bigmacRecipe);
  })
  it('Encontra card koshari na tela', async () => {
    const koshariRecipe = await screen.findByRole('heading', { name:/koshari/i });
    expect(koshariRecipe).toBeInTheDocument();
    userEvent.click(koshariRecipe);
  })
  it('Testa se o botão de comida está no footer da tela', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const buttonFoods = await screen.findByTestId('food-bottom-btn');
    expect(buttonFoods).toBeInTheDocument();
  })
  it('Testa se o botão de bebidas está no footer da tela', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const buttonDrinks = await screen.findByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
  })
  it('testa se existem botões por categorias e as interações na tela', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // encontra o botão All na tela
    const allBtn = await screen.findByRole('button', {name:/all/i});
    expect(allBtn).toBeInTheDocument();
    // encontra o botão Beef na tela
    const btnBeef = await screen.findByRole('button', {name:/beef/i});
    expect(btnBeef).toBeInTheDocument();
    // encontra o botão breakfast na tela
    const btnBreakfast = await screen.findByRole('button', {name:/Breakfast/i});
    expect(btnBreakfast).toBeInTheDocument();
    // clica no botão breakfast
    userEvent.click(btnBreakfast);
    // encontra os cards filtrados pelo botão, sendo o primeiro o breakfast potatoes
    const cardFilterBreakfast = await screen.findByRole('heading', {  name: /breakfast potatoes/i});
    expect(cardFilterBreakfast).toBeInTheDocument;
    // clica novamente no botão breakfast para voltar a tela incial sem filtragem
    userEvent.click(btnBreakfast);
    // encontra na tela o card da receita Corba (que aparece sempre na tela incial)
    const corbaRecipe = await screen.findByRole('heading', {name: /corba/i});
    expect(corbaRecipe).toBeInTheDocument();
  })
})