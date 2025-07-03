import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CapsuleIndexPage from '../screens/CapsuleIndexPage';
import CapsuleMainPage from '../screens/CapsuleMainPage';
import CapsulePicturePage from '../screens/CapsulePicturePage';
import CapsuleFormPage from '../screens/CapsuleFormPage';
import CapsuleUploadPage from '../screens/CapsuleUploadPage';
import { RootStackParamList } from '../store/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function CapsuleStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
      headerShown: false,
    }}
      initialRouteName="CapsuleIndexPage">
      <Stack.Screen name="CapsuleIndexPage" component={CapsuleIndexPage} />
      <Stack.Screen name="CapsuleMainPage" component={CapsuleMainPage} />
      <Stack.Screen name="CapsulePicturePage" component={CapsulePicturePage} />
      <Stack.Screen name="CapsuleFormPage" component={CapsuleFormPage} />
      <Stack.Screen name="CapsuleUploadPage" component={CapsuleUploadPage} />
    </Stack.Navigator>
  );
}
