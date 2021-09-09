import React, { useReducer, createContext } from 'react';
import mime from 'mime';
import forumApi from '../api/forumApi';

export const Context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch_articles':
      return { ...state, articles: action.payload };
    case 'fetch_article': {
      return { ...state, article: action.payload };
    }
    case 'remove_fetched_article': {
      return { ...state, article: null };
    }
    default:
      return state;
  }
};

const ArticleContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    articles: [],
    article: null,
  });

  const fetchArticles = async (setError) => {
    const res = await forumApi.get('/api/v1/articles');

    if (res.status !== 201) {
      return setError(res.data.message);
    }

    const { documents } = res.data.data;
    dispatch({ type: 'fetch_articles', payload: documents });
  };

  const createArticle = async ({ title, body, image }, cb, setError) => {
    const imageToUpload = {
      name: image.fileName || image.uri.substr(image.uri.lastIndexOf('/') + 1),
      uri: 'file:///' + image.uri.split('file:/').join(''),
      type: mime.getType(image.uri),
    };

    const payload = new FormData();
    payload.append('title', title);
    payload.append('body', body);
    payload.append('photo', imageToUpload);

    const res = await forumApi.post('/api/v1/articles', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    if (res.status !== 201) {
      return setError(res.data.message);
    }

    cb();
  };

  const getArticle = (id) => {
    const article = state.articles.filter((art) => art.id === id)[0];
    dispatch({ type: 'fetch_article', payload: article });
  };

  const removeFetchedArticle = () => {
    dispatch({ type: 'remove_fetched_article' });
  };

  return (
    <Context.Provider
      value={{
        state,
        fetchArticles,
        createArticle,
        getArticle,
        removeFetchedArticle,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ArticleContext;
