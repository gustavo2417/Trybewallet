const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case anyone:
    return {
      ...state,
    };
  default:
    return state;
  }
}

export default wallet;
