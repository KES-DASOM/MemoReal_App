import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import TabNavigator from './src/navigation/TabNavigator';
import { AuthProvider, useAuth } from './src/hooks/AuthContext';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function RootNavigator() {
  const {isLoggedIn} = useAuth();
  return isLoggedIn ? <TabNavigator /> : <AuthStackNavigator />;
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthProvider>
          <NavigationContainer>
            <SafeAreaView
              style={{
                flex: 1,
                paddingTop: 10,
                backgroundColor: 'white',
              }}>
              <RootNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;