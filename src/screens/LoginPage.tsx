import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function LoginPage() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      {/* 로고부 */}
      <View className="items-center mt-4 mb-20">
        {/* 로고 이미지 */}
        <Image
          source={require('../assets/images/logo-full.png')}
          className="w-44 h-32 mb-5"
          resizeMode="contain"
        />
        {/* 설명 텍스트 */}
        <Text className="text-base text-purple3 font-medium text-center">
          추억을 영원히 간직하는 디지털 타임캡슐
        </Text>
      </View>

      {/* 카카오 로그인 버튼 */}
      <TouchableOpacity className="w-[183px] h-[45px] mt-24 mb-5">
        <Image
          source={require('../assets/images/kakao_login_medium_narrow.png')}
          className="w-full h-full"
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* 메모리얼 로그인 버튼 */}
      <TouchableOpacity className="w-[183px] h-[45px] bg-purple1 rounded-[10px] items-center justify-center">
        <Text className="text-white">메모리얼 로그인</Text>
      </TouchableOpacity>
    </View>
  );
} 