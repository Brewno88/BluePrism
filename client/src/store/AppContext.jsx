import React, { useReducer, useState } from 'react';
import { AppReducers } from './AppReducers';

export const AppContext = React.createContext();

export const AppContextProvider = props => {
  const [selected, dispatchSelected] = useReducer(AppReducers, null);

  const providerValue = {
    selected,
    dispatchSelected
  };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};
