import React from 'react';
import MainPage from '../screens/MainPage';
import MainInfoPage from '../screens/MainInfoPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../store/types';

const MainStack = createNativeStackNavigator<MainStackParamList>();

function MainStackNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
      headerShown: false,
    }}
      initialRouteName="MainPage">
      <MainStack.Screen name="MainPage" component={MainPage} />
      <MainStack.Screen name="MainInfoPage" component={MainInfoPage}
      />
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
