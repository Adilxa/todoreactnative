import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTasksStore } from '../../../store/modules/tasks';
import { generateUniqueId } from '../../../utils/idGenerator';

type CreateTaskFormProps = {
    onClose: () => void;
};

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',

    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: "gray"
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: "black"
    },
    button: {
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "600"
    },
});

export default CreateTaskForm;
