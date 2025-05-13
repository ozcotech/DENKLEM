import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DisputeCategoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uyuşmazlık Kategorisi</Text>
      <Text style={styles.subtitle}>Lütfen bir kategori seçin.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e86de',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default DisputeCategoryScreen;