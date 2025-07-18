import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { PencilSimpleIcon } from 'phosphor-react-native';

export default function MyPageSettingPage() {

  return (
    <ScrollView className="flex-1 bg-white">

      <View className="flex-row">
        <View className="bg-white rounded-full shadow-lg shadow-black/100">
          <View className="w-16 h-16 rounded-full bg-gray-300" />
          <View className="absolute left-12 bottom-0 w-8 h-8 rounded-full bg-white items-center justify-center">
            <PencilSimpleIcon size={16} />
          </View>
        </View>
        <View className="flex">
          <Text>할일외면하기</Text>
          <TouchableOpacity>
            <Text className="text-xs text-[#B3B3B3]">로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}
