import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from '../screens/MainPage';
import MyPage from '../screens/MyPage';
import CapsuleStackNavigator from './CapsuleStackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: () => null,
      }}>
      <Tab.Screen
        name="Home"
        component={MainPage}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Capsule"
        component={CapsuleStackNavigator}
        options={{
          tabBarLabel: 'Capsule',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: 'MyPage',
        }}
      />
    </Tab.Navigator>
  );
}
