import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalPopUp = ({visible, onClose, children}: Props) => {
  const [showModal, setShowModal] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.7,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => setShowModal(false));
    }
  }, [visible]);

  const handleOverlayPress = () => {
    if (visible) {
      onClose();
    }
  };

  return (
    <Modal
      transparent={true}
      visible={showModal}
      animationType="none"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
              ]}>
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: 300,
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
});

export default ModalPopUp;
