import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function MyPage() {
  return (
    <ScrollView className="flex-1 bg-white px-5 pt-10">
      {/* 마이페이지 타이틀 */}
      <Text className="text-xl font-bold mb-4">마이페이지</Text>

      {/* 헤더 */}
      <View className="flex-row items-center justify-between bg-gray-200 rounded-2xl px-4 py-3 mb-6 shadow">
        <View className="flex-row items-center">
          <View className="w-[25%] aspect-square shrink-0 rounded-full bg-purple1 border border-black items-center justify-center mr-3">
            <Text className="text-lg">🐱</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <Text className="text-base font-medium">할일외면하기</Text>
            <TouchableOpacity>
              <Text className="text-xs text-gray-400">로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <View className="w-6 h-6 items-center justify-center">
            <Text className="text-xl text-gray-600">⚙️</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 지갑 */}
     <View className="bg-gray-200 rounded-2xl p-5 mb-6 shadow items-center">
      {/* 모래시계 이모지 */}
      <View className="absolute -top-0 left-4">
        <Text className="text-lg text-purple-500">⏳</Text>
      </View>

      <Text className="text-2xl font-bold mb-4">$32,915.18</Text>
      <View className="flex-row space-x-3">
        <TouchableOpacity className="bg-purple3 rounded-full px-6 py-2">
          <Text className="text-white text-sm font-medium">보내기</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-purple3 rounded-full px-6 py-2">
          <Text className="text-white text-sm font-medium">거래내역</Text>
        </TouchableOpacity>
      </View>
    </View>

    );
  }

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
        className="w-[48%] aspect-square bg-purple1 rounded-lg justify-end p-2 mb-3"
      >
        <Text
          className="w-[80%] text-xs text-black whitespace-pre-line bg-white px-2 py-1 rounded-md"
        >
          {item.label}
        </Text>
      </View>
    ))}
  </View>

    </ScrollView>
  );
}
