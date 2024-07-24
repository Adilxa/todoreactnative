import 'react-native-gesture-handler';
import React from 'react';
import { HomeScreen } from './src/pages/HomePage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen />
    </GestureHandlerRootView>
  );
}

export default App;