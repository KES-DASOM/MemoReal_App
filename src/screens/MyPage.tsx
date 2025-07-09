import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function MyPage() {
  return (
    <ScrollView className="flex-1 bg-white px-5 pt-10">
      <Text className="text-xl font-bold mb-4">마이페이지</Text>

      {/* 헤더 */}
      <View className="flex-row justify-between items-center mb-5">
        <View className="flex-row items-center">
          <View className="w-9 h-9 rounded-full bg-gray-300 mr-2" />
          <Text className="text-base font-medium mr-2">고양이는고양</Text>
          <TouchableOpacity>
            <Text className="text-sm text-gray-500">로그아웃</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text className="text-sm text-gray-700">환경설정</Text>
        </TouchableOpacity>
      </View>

      {/* 지갑 */}
      <View className="bg-gray-200 rounded-2xl p-5 items-center mb-5">
        <Text className="text-base mb-2">지갑</Text>
        <Text className="text-2xl font-bold mb-4">$ 10,000</Text>
        <View className="flex-row justify-between w-full">
          <TouchableOpacity>
            <Text className="text-sm text-gray-700">거래내역</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-sm text-gray-700">보내기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 그리드 */}
      <View className="flex-row flex-wrap justify-between">
        {[
          { id: 1, label: '오픈일까지\nD-2' },
          { id: 2, label: '오픈일까지\nD-2' },
          { id: 3, label: '오픈일 2025.06.06' },
          { id: 4, label: '오픈일까지\nD-2' },
        ].map((item) => (
          <View
            key={item.id}
            className="w-[48%] aspect-square bg-gray-300 rounded-lg justify-end p-2 mb-3"
          >
            <Text className="text-xs text-black whitespace-pre-line">{item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
