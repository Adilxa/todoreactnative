import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useTasksStore} from '../../../store/modules/tasks';

type Props = {
  text: string;
  description?: string;
  id: string | number;
  setModal: () => void;
};

const EditExistTask = ({text, description, id, setModal}: Props) => {
  const {updateTask} = useTasksStore(state => state);

  const [title, setTitle] = useState(text);
  const [desc, setDescription] = useState(description || '');

  const handleSubmit = (
    id: string | number,
    text: string,
    description: string,
  ) => {
    updateTask(id, text, description);
    setModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit task {text}</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="gray"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="gray"
        value={desc}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit(id, title, desc)}>
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
    shadowColor: '#000',
    width: '100%',
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
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default EditExistTask;
