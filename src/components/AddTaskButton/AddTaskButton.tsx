import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const AddTaskButton = ({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const handleSetModal = () => {
        setModal((prev) => !prev)
    }

    return (
        <TouchableOpacity
            style={styles.wrapper}
            onPress={() => handleSetModal()}
        >
            <Text style={styles.plus}>Add new task</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 50,
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
        paddingHorizontal: 20
    },
    plus: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333"
    }
})

export default AddTaskButton