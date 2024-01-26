import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ location }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60
  },
  title: {
    textAlign: 'center',
    color: '#000',
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default Header;
