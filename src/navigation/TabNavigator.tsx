import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CapsuleStackNavigator from './CapsuleStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import MypageStackNavigator from './MyPageStackNavigator';

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
        component={MainStackNavigator}
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
        component={MypageStackNavigator}
        options={{
          tabBarLabel: 'MyPage',
        }}
      />
    </Tab.Navigator>
  );
}
