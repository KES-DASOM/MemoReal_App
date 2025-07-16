import React from 'react';
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
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
