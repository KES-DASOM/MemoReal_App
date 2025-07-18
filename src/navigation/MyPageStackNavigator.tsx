import React from 'react';
import MyPage from '../screens/MyPage';
import MyPageSettingPage from '../screens/MyPageSettingPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyPageStackParamList } from '../store/types';

const MypageStack = createNativeStackNavigator<MyPageStackParamList>();

function MypageStackNavigator() {
  return (
    <MypageStack.Navigator initialRouteName="MyPage">
      <MypageStack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }} />
      <MypageStack.Screen
        name="MyPageSettingPage"
        component={MyPageSettingPage}
        options={{
          headerShown: true,
          title: '마이페이지',
          headerTitleStyle: { fontSize: 16 },
          headerTitleAlign: 'center'}}
          />
    </MypageStack.Navigator>
  );
}

export default MypageStackNavigator;
