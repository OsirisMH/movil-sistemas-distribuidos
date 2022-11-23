import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}> Sistemas Distribuidos </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0A2F66',
  },
});
