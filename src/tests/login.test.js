import React from "react";
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'

describe('testa a pagina de login', () => {
  it('testa se na rota "/" existe os input de senha e login', () => {
    renderWithRouterAndRedux(<App />)
    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  })
  it('testa se o botão entrar está na tela e esta desabilitado', () => {
    renderWithRouterAndRedux(<App />)
    const button = screen.getByText(/entrar/i)

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  })
  it('testa se o botão fica disponível quando os input são preenchidos corretamente', () => {
    renderWithRouterAndRedux(<App />)
    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const button = screen.getByText(/entrar/i);
    
    userEvent.type(inputEmail, 'alguem@teste.com');
    userEvent.type(inputPassword, 'aleatória');
    
    expect(button).not.toBeDisabled();
  });
  it('testa se muda de rota quando clica no botão', () => {
    renderWithRouterAndRedux(<App />)
    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const button = screen.getByText(/entrar/i);
    
    userEvent.type(inputEmail, 'alguem@teste.com');
    userEvent.type(inputPassword, 'aleatória');
    userEvent.click(button)

    const text = screen.getByText('BRL');
    
    expect(text).toBeInTheDocument();
  })
});
