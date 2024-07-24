import React, { useRef, useState } from 'react';
import {
    Text,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTasksStore } from '../../store/modules/tasks';
import RenderLeftAction from './atoms/RenderLeftAction';
import RenderRightAction from './atoms/RenderRightAction';
import { ModalPopUp } from '../Modal';
import EditExistTask from './atoms/EditExistTask';

type Props = {
    id: string | number;
    title: string;
    description?: string;
    status: boolean;
};

const Task = ({ id, title, description, status }: Props) => {
    const { removeTask, onMarkDone } = useTasksStore(state => state);
    const swipeableRef = useRef<Swipeable>(null);
    const animation = useRef(new Animated.Value(1)).current;

    const [modal, setModal] = useState(false);

    const renderLeftActions = () => (
        <RenderLeftAction
            isActive={status}
            wrapperStyle={[styles.action, styles.doneAction]}
            titleStyle={[styles.actionText]}
        />
    );

    const renderRightActions = () => (
        <RenderRightAction
            wrapperStyle={[styles.action, styles.deleteAction]}
            titleStyle={[styles.actionText]}
        />
    );

    const handleSwipeLeft = () => {
        onMarkDone(id, !status);
        swipeableRef.current?.close();
    };

    const handleSwipeRight = () => {
        removeTask(id);
        swipeableRef.current?.close();
    };

    const handlePressIn = () => {
        Animated.spring(animation, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animation, {
            toValue: 1,
            friction: 5,
            tension: 200,
            useNativeDriver: true,
        }).start();
    };

    const animatedStyle = {
        transform: [{ scale: animation }],
    };

    return (
        <>
            <Swipeable
                ref={swipeableRef}
                renderLeftActions={renderLeftActions}
                onSwipeableLeftOpen={handleSwipeLeft}
                renderRightActions={renderRightActions}
                onSwipeableRightOpen={handleSwipeRight}>
                <TouchableWithoutFeedback
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onLongPress={() => setModal(true)}>
                    <Animated.View
                        style={[
                            styles.container,
                            status && styles.doneContainer,
                            animatedStyle,
                        ]}>
                        <Text
                            style={status ? styles.title : { ...styles.title, color: '#333' }}>
                            {title}
                        </Text>
                        {description ? (
                            <Text
                                style={
                                    status
                                        ? styles.description
                                        : { ...styles.description, color: '#333' }
                                }>
                                {description}
                            </Text>
                        ) : null}
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Swipeable>
            <ModalPopUp visible={modal} setModal={setModal}>
                <EditExistTask
                    setModal={() => setModal(false)}
                    id={id}
                    text={title}
                    description={description}
                />
            </ModalPopUp>
        </>
    );
};

const styles = StyleSheet.create({
    action: {
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
        width: 90,
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    deleteAction: {
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
    },
    description: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    doneAction: {
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
    },
    doneContainer: {
        backgroundColor: 'lightgreen',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default Task;
