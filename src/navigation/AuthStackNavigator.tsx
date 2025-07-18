import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../screens/LoginPage';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      {/* 로그인 성공 시 TabNavigator로 이동할 수 있도록 아래 라인 유지 */}
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
} 