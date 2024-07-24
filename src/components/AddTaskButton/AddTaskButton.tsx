import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const AddTaskButton = ({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleSetModal = () => {
    setModal(prev => !prev);
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => handleSetModal()}>
      <Text style={styles.plus}>Add new task</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plus: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 3,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});

export default AddTaskButton;
