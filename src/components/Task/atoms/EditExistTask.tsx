import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useTasksStore } from '../../../store/modules/tasks';

type Props = {
    text: string;
    description?: string;
    id: string | number;
    setModal: () => void
}

const EditExistTask = ({ text, description, id, setModal }: Props) => {

    const { updateTask } = useTasksStore(state => state)

    const [title, setTitle] = useState(text);
    const [desc, setDescription] = useState(description || "")

    const handleSubmit = (id: string | number, text: string, description: string) => {
        updateTask(id, text, description)
        setModal()
    }

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
            <TouchableOpacity style={styles.button}
                onPress={() => handleSubmit(id, title, desc)}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

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


export default EditExistTask