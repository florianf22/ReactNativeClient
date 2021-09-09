import React, { useReducer, createContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import forumApi from '../api/forumApi';

export const Context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'logout':
      return {
        ...state,
        token: undefined,
        user: undefined,
      };
    case 'error': {
      return {
        token: undefined,
        user: undefined,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    token: undefined,
    user: undefined,
    errorMessage: '',
  });

  useEffect(() => {
    tryLocalSignin();
    // logout();
  }, []);

  const setState = async (res, callback) => {
    if (res.status !== 201) {
      return callback(err.data.message);
    }
    const {
      token,
      data: { user },
    } = res.data;

    await SecureStore.setItemAsync('token', token);
    dispatch({ type: 'signin', payload: { token, user } });
  };

  const signup = async (values, callback) => {
    const { fullName, email, password, passwordConfirm } = values;
    const res = await forumApi.post('/api/v1/users/signup', {
      fullName,
      email,
      password,
      passwordConfirm,
    });

    setState(res, callback);
  };

  const signin = async (values, callback) => {
    const { email, password } = values;
    const res = await forumApi.post('/api/v1/users/signin', {
      email,
      password,
    });

    setState(res, callback);
  };

  const tryLocalSignin = async () => {
    const token = await SecureStore.getItemAsync('token');

    if (token) {
      try {
        const res = await forumApi.get('/api/v1/users/me');

        const {
          token,
          data: { user },
        } = res.data;

        await SecureStore.setItemAsync('token', token);
        dispatch({ type: 'signin', payload: { token, user } });
      } catch (err) {
        logout();
      }
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    await forumApi.get('/api/v1/users/signout');
  };

  return (
    <Context.Provider value={{ state, signup, signin, logout }}>
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
