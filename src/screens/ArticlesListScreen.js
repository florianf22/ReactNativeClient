import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
//
import { Context as ArticleContext } from '../context/ArticleContext';
import Wrapper from '../components/Wrapper';
import ArticleBox from '../components/ArticleBox';
import ErrorText from '../components/ErrorText';

const ArticlesListScreen = ({ navigation }) => {
  const [error, setErorr] = useState(null);

  const {
    state: { articles },
    fetchArticles,
    fetchArticle,
  } = useContext(ArticleContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchArticles(setErorr);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Wrapper>
      <FlatList
        data={articles}
        renderItem={({ item }) => {
          return (
            <ArticleBox
              title={item.title}
              body={item.body}
              onPress={() =>
                navigation.navigate('ArticleDetails', {
                  id: item._id,
                })
              }
            />
          );
        }}
        keyExtractor={(item) => item._id}
      />

      <ErrorText error={error} />
    </Wrapper>
  );
};

const styles = StyleSheet.create({});

export default ArticlesListScreen;
