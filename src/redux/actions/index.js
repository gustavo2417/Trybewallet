export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export const requestAPI = () => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(URL);
  const resolved = await request.json();
  const filter = Object.keys(resolved).filter((coin) => coin !== 'USDT');
  dispatch(saveCurrencies(filter));
};

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  expenses,
});

export const removeExpenses = (payload) => ({
  type: REMOVE_EXPENSES,
  payload,
});
