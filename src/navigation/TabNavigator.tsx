import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyPage from '../screens/MyPage';
import CapsuleStackNavigator from './CapsuleStackNavigator';
import MainStackNavigator from './MainStackNavigator';

import NavTabCentralButton from '../components/UI/NavTapCentralButton';
import NavTabIcon from '../components/UI/NavTapIcon';

const HomeOutlineIcon = require('../assets/images/nav-main-outline.png');
const HomeFilledIcon = require('../assets/images/nav-main-filled.png');
const MyPageOutlineIcon = require('../assets/images/nav-mypage-outline.png');
const MyPageFilledIcon = require('../assets/images/nav-mypage-filled.png');
const CapsuleOutlineIcon = require('../assets/images/nav-capsule-outline.png');
const CapsuleFilledIcon = require('../assets/images/nav-capsule-filled.png');

import { HomeTabParamList } from '../store/types';
import NavTapBackground from '../components/UI/NavTapBackground';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 16,
        },
        tabBarBackground: () => (
          <NavTapBackground />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavTabIcon
              focused={focused}
              iconOutline={HomeOutlineIcon}
              iconFilled={HomeFilledIcon}
              label="Home"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Capsule"
        component={CapsuleStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavTabCentralButton
              focused={focused}
              iconOutline={CapsuleOutlineIcon}
              iconFilled={CapsuleFilledIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavTabIcon
              focused={focused}
              iconOutline={MyPageOutlineIcon}
              iconFilled={MyPageFilledIcon}
              label="MyPage"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}