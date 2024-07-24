import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TasksState, ITask } from '../../../types';

const loadTasks = async (): Promise<ITask[]> => {
    try {
        const tasks = await AsyncStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
        console.error('Failed to load tasks from AsyncStorage:', error);
        return [];
    }
};

const saveTasks = async (tasks: ITask[]) => {
    try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Failed to save tasks to AsyncStorage:', error);
    }
};

const useTasksStore = create<TasksState>()(
    immer((set, get) => ({
        tasks: [],
        isLoading: false,
        errors: [],
        loadTasks: async () => {
            set(state => { state.isLoading = true });
            const tasks = await loadTasks();
            set(state => {
                state.tasks = tasks;
                state.isLoading = false;
            });
        },
        addTask: (task) => set(state => {
            state.tasks.push({ ...task });
            saveTasks(state.tasks);
        }),
        removeTask: (id) => set(state => {
            state.tasks = state.tasks.filter((el) => el.id !== id);
            saveTasks(state.tasks);
        }),
        updateTask: (id, title, description) => set(state => {
            const task = state.tasks.find(el => el.id === id);
            if (task) {
                task.title = title;
                if (description !== undefined) {
                    task.description = description;
                }
                saveTasks(state.tasks);
            }
        }),
        onMarkDone: (id, status) => set(state => {
            const task = state.tasks.find(el => el.id == id);
            if (task) {
                task.status = status;
                saveTasks(state.tasks);
            }
        })
    }))
);

export default useTasksStore;
