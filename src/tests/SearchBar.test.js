import { screen, waitFor } from '@testing-library/react';

import { resultByName } from './mocks/searchByName';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';


describe('Testando o componente Recipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn()
        .mockResolvedValue(resultByName)})
    jest.setTimeout(7000)
  });

  afterEach(() => jest.clearAllMocks());

  it('Resposta da API', async () => {
    renderWithRouter(<App />, '/foods')
    expect(global.fetch).toHaveBeenCalled();
  })
  it('Alerta quando é feita com mais 1 letra no First Letter', async () => {
    renderWithRouter(<App />, '/foods')
    const buttonSearch = screen.getByTestId('search-top-btn');

    userEvent.click(buttonSearch);

    const searchBar = screen.getByRole('textbox');
    const firstLetterRadio =screen.getByRole('radio', {  name: /first letter/i})
    const btnSearch = screen.getByRole('button', {  name: /search/i})
    userEvent.type(searchBar, 'aa');
    userEvent.click(firstLetterRadio);
    userEvent.click(btnSearch);

    expect(global.fetch).toHaveBeenCalled();
  })
  it('Redirecinado para pagina de datalhes quando acha apenas uma receita', async () => {
    const {history} = renderWithRouter(<App />, '/foods')

    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);

    const searchBar = screen.getByRole('textbox');
    const nameRadio = screen.getByRole('radio', {
      name: /name/i
    })
    const btnSearch = screen.getByRole('button', {  name: /search/i})
    expect(searchBar).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
    
    userEvent.type(searchBar, 'corba');
    userEvent.click(nameRadio);
    userEvent.click(btnSearch, undefined, {skipPointerEventsCheck: true})

    const path = history.location.pathname;
    
    // history.push('/foods')
    expect(path).toEqual('/foods/52977')
  })
})