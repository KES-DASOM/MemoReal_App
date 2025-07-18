import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import TabNavigator from './src/navigation/TabNavigator';
import { AuthProvider, useAuth } from './src/hooks/AuthContext';

function RootNavigator() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <TabNavigator /> : <AuthStackNavigator />;
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;