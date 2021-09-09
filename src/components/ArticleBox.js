import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//

const ArticleBox = ({ title, body, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#1C4670',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 5,
    color: '#1C4670',
  },
  body: {
    marginBottom: 10,
  },
});

export default ArticleBox;
