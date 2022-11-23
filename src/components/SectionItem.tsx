import React from 'react';
import { Surface, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface ItemProps {
  title: string;
}

export const Item: React.FC<ItemProps> = ({ title }) => (
  <Surface style={styles.surface} elevation={4}>
    <Text style={styles.title}>{title}</Text>
  </Surface>
);

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    padding: 20,
  },
  surface: {
    alignItems: 'center',
    backgroundColor: '#104ba2',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 10,
    marginVertical: 20,
    padding: 8,
    height: 100,
  },
});
