import React, { useReducer, createContext } from 'react';

export const Context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return true;
    case 'error':
      return false;
    default:
      return state;
  }
};

const ArticleContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, false);

  const paymentSuccess = () => {
    dispatch({ type: 'success' });
  };

  const paymentError = () => {
    dispatch({ type: 'error' });
  };

  return (
    <Context.Provider value={{ state, paymentError, paymentSuccess }}>
      {children}
    </Context.Provider>
  );
};

export default ArticleContext;
