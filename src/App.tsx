/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, View } from 'react-native';
import { CalculeitorScreen } from './screens/CalculeitorScreen';
import { styles } from './config/theme/app-theme';

function App() {
  return (
    <View style={styles.background}>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <CalculeitorScreen/>
    </View>
  );
}

export default App;
