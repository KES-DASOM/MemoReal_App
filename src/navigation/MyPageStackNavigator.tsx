import React from 'react';
import MyPage from '../screens/MyPage';
import MyPageSettingPage from '../screens/MyPageSettingPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MypageStackParamList } from '../store/types';

const MypageStack = createNativeStackNavigator<MypageStackParamList>();

function MypageStackNavigator() {
  return (
    <MypageStack.Navigator
      screenOptions={{
      headerShown: false,
    }}
      initialRouteName="MyPage">
      <MypageStack.Screen name="MyPage" component={MyPage} />
      <MypageStack.Screen name="MypageSettingPage" component={MyPageSettingPage} />
    </MypageStack.Navigator>
  );
}

export default MypageStackNavigator;
