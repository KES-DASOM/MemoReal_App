import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { PencilSimpleIcon } from 'phosphor-react-native';
import { useProfileStroe } from '../store/useProfileStore';

export default function MyPageSettingPage() {
  const {nickname, imageUrl} = useProfileStroe()

  return (
    <ScrollView className="flex-1 bg-white">

      <View className="flex-row items-center ml-7 mt-12">
        <View className="bg-white rounded-full shadow-lg shadow-black/100">
          <Image src={imageUrl} className="w-20 h-20 rounded-full bg-gray-300" />
          <View className="absolute left-12 bottom-0 w-8 h-8 rounded-full bg-white items-center justify-center">
            <PencilSimpleIcon size={16} />
          </View>
        </View>
        <View className="flex ml-4 space-y-1">
          <Text className="text-lg">{nickname}</Text>
          <TouchableOpacity>
            <Text className="text-xs text-[#B3B3B3]">로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="border-b border-grey2 w-full mt-10 mb-6" />
      <TouchableOpacity>
        <Text className="mx-7 text-grey3">새 지갑 생성하기</Text>
      </TouchableOpacity>
      <View className="border-b border-grey2 w-full my-6" />
      <TouchableOpacity>
        <Text className="mx-7 text-grey3">계정 탈퇴</Text>
      </TouchableOpacity>
      <View className="border-b border-grey2 w-full my-6" />

    </ScrollView>
  );
}
