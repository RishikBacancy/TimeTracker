import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FeedScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>In Feed Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedScreen;
