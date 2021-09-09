import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
//
import { Context as ArticleContext } from '../context/ArticleContext';
import Spacer from '../components/Spacer';
import forumApi from '../api/forumApi';

const ArticleDetailsScreen = ({ route, navigation }) => {
  const {
    state: { article },
    getArticle,
    removeFetchedArticle,
  } = useContext(ArticleContext);
  const { id } = route.params;
  const { baseURL } = forumApi.defaults;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getArticle(id);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      removeFetchedArticle();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Card style={{ flex: 1 }}>
      <Card.Title>{article?.title}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={{
          uri: `${baseURL}/static/images/articles/${article?.photo}`,
        }}
      ></Card.Image>

      <Spacer />

      <Text style={{ marginBottom: 10 }}>{article?.body}</Text>

      <Spacer />

      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Go Back"
        onPress={() => navigation.navigate('ArticlesList')}
      />
    </Card>
  );
};

const styles = StyleSheet.create({});

export default ArticleDetailsScreen;
