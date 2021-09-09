import React, { useState, useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
//
import Wrapper from '../components/Wrapper';
import Button from '../components/Button';
import { Context as ArticleContext } from '../context/ArticleContext';
import { Context as PaymentContext } from '../context/PaymentContext';
import ImagePicker from '../components/ImagePicker';
import ErrorText from '../components/ErrorText';

const CreateArticleScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { createArticle } = useContext(ArticleContext);
  const { state: paid } = useContext(PaymentContext);

  const manageStateAndCreateArticle = async () => {
    setLoading(true);
    setError(null);

    if (!paid) {
      navigation.navigate('Stripe');
    } else {
      await createArticle(
        { title, body, image },
        () => navigation.navigate('ArticlesList'),
        setError
      );
    }

    setLoading(false);
  };

  return (
    <Wrapper>
      <Spinner
        visible={loading}
        textContent={'Image is being uploaded...'}
        textStyle={{ color: '#FFF' }}
      />

      <Input
        placeholder="Title"
        leftIcon={{ type: 'entypo', name: 'news' }}
        value={title}
        onChangeText={setTitle}
      />

      <Input
        placeholder="Article"
        leftIcon={{ type: 'entypo', name: 'newsletter' }}
        value={body}
        onChangeText={setBody}
      />

      <ImagePicker image={image} setImage={setImage} />

      <ErrorText error={error} />

      <Button
        title="Publish your article"
        iconName="upload"
        onPress={manageStateAndCreateArticle}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({});

export default CreateArticleScreen;
