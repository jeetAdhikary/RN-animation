import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import Ball from './src/Ball'
import Box from './src/Box';
import TextStudy from './src/Text';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextStudy />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
