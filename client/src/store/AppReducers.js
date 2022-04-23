export const SELECT_CARD = 'SELECT_CARD';

export const AppReducers = (state, action) => {
  switch (action.type) {
    case SELECT_CARD:
      return action.payload;
    default:
      return state;
  }
};
