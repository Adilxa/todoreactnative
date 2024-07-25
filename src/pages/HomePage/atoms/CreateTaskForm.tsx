import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTasksStore } from '../../../store/modules/tasks';
import { generateUniqueId } from '../../../utils/idGenerator';

type CreateTaskFormProps = {
  onClose: () => void;
};

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionHeight, setDescriptionHeight] = useState(40);

  const { addTask } = useTasksStore(state => state);

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Title is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      addTask({ title, description, id: generateUniqueId(), status: false });
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Task</Text>
      <TextInput
        style={[styles.input, { height: 40 }]}
        placeholder="Title"
        placeholderTextColor="gray"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: descriptionHeight }]}
        placeholder="Description"
        placeholderTextColor="gray"
        value={description}
        onChangeText={setDescription}
        multiline
        onContentSizeChange={(e) => {
          const height = e.nativeEvent.contentSize.height;
          const maxHeight = 120;
          setDescriptionHeight(height > maxHeight ? maxHeight : height);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
  },
  header: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    color: 'black',
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
});

export default CreateTaskForm;
