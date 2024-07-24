import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const NoData = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    No Tasks Available
                </Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default NoData;
