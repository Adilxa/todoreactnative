import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const NoData = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>No Tasks Available</Text>
        <Text style={styles.message}>
          It looks like you don't have any tasks right now.
          {'\n'}Click the "Add new task" button to create one.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  message: {
    color: '#666',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 15,
  },
});

export default NoData;
