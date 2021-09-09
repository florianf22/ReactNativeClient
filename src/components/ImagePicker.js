import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePickerExpo from 'expo-image-picker';

//
import Button from './Button';

const ImagePicker = ({ image, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [error, setErro] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePickerExpo.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    setLoading(true);
    const result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setLoading(false);

    if (!result.cancelled) {
      setImage(result);
    } else {
      setError(result.message);
    }
  };

  return (
    <View style={styles.flexOne}>
      <Spinner
        visible={loading}
        textContent={'Image is being uploaded...'}
        textStyle={{ color: '#FFF' }}
      />
      <Button
        title="Pick an image from camera roll"
        onPress={pickImage}
        iconName="picture"
      />
      {image && <Text>Image has been picked</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});

export default ImagePicker;
