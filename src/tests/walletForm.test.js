import React from "react";
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('testa o componente WalletForm', () => {
  afterEach(() => jest.clearAllMocks());

  it('testa se na tela os itens esperados aparecem', () => {
    const INITIAL_STATE = {
      user: {
        email: 'alguem@teste.com',
      }
    }

    renderWithRouterAndRedux(<Wallet />, {
      initialState: INITIAL_STATE
    });

    const email = screen.getByText(/alguem@teste.com/i);
    const total = screen.getByTestId('total-field')
    const moeda = screen.getByText(/brl/i);


    expect(total).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
  });

  it('testa se ao adicionar uma despesa o header e a tabela possuem os elementos esperados', async () => {
    const data = mockData;
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    })

    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const button = screen.getByText(/Adicionar despesa/i);
    userEvent.type(inputValue, '8');
    userEvent.type(inputDescription, 'pizza');
    userEvent.click(button);

    await screen.findAllByText('38.02');
    const total = screen.getByTestId('total-field')
    const description = screen.getByText(/pizza/i);
    const value = screen.getAllByText(/38.02/i);

    expect(total.innerHTML).toBe('38.02');
    expect(description).toBeInTheDocument();
    expect(value[1]).toBeInTheDocument();
  });

  it('testa se ao remover uma despesa , ela é removida do header e da tabela', async () => {
    const data = mockData;
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    })

    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const button = screen.getByText(/Adicionar despesa/i);

    userEvent.type(inputValue, '8');
    userEvent.type(inputDescription, 'pizza');
    userEvent.click(button);

    await screen.findAllByText('38.02');
    const removeButton = screen.getByTestId('delete-btn');
    userEvent.click(removeButton);

   const totalValue = screen.queryByText(/38.02/i);
   expect(totalValue).toBeNull();
  })
}); 