import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTasksStore } from '../../store/modules/tasks';
import Task from '../../components/Task/Task';
import { ITask } from '../../types';
import AddTaskButton from '../../components/AddTaskButton/AddTaskButton';
import { ModalPopUp } from '../../components/Modal';
import NoData from './atoms/NoData';
import CreateTaskForm from './atoms/CreateTaskForm';

function HomeScreen() {
    const { tasks, loadTasks } = useTasksStore(state => state);

    const [open, setOpen] = useState(false);

    const renderItem = useMemo(
        () =>
            ({ item }: { item: ITask }) => (
                <Task
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                />
            ),
        [tasks],
    );

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <View style={styles.container}>
            {tasks.length ? (
                <FlatList
                    data={tasks}
                    renderItem={renderItem}
                    keyExtractor={item => String(item.id)}
                    contentContainerStyle={styles.list}
                    style={{ width: '100%' }}
                />
            ) : (
                <NoData />
            )}
            <AddTaskButton setModal={setOpen} />
            <ModalPopUp visible={open} onClose={() => setOpen(false)}>
                <CreateTaskForm onClose={() => setOpen(false)} />
            </ModalPopUp>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    list: {
        paddingBottom: 20,
    },
});

export default HomeScreen;
