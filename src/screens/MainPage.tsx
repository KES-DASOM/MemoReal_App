  import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import CardButton from '../components/UI/CardButton';

export default function MainPage() {
  return (
    <ScrollView className="flex-1 bg-white pt-3">
      {/* 상단 날짜 및 알림 */}
      <View className="flex-row justify-between items-center mb-4 mx-7">
        <View>
          <Text className="text-sm font-semibold text-black">메모리얼에서 추억을 보관한지</Text>
          <Text><Text className="text-purple-500 font-bold">100</Text> 일째</Text>
        </View>
        <Image
            source={require('../assets/images/alarm-bell.png')}
            className="w-[16px] h-[20px]"
        />
      </View>

      {/* 잔액 카드 */}
      <View className="bg-purple-100 py-2 items-center mb-6 px-7">
        <View className="bg-white rounded-2xl shadow-xl py-5 w-full items-center border">
          <Image
              source={require('../assets/images/icon-in-card.png')}
              className="w-[16px] h-[20px]"
          />

          <Text className="text-2xl font-bold text-black mb-4">
            $32,915.18
          </Text>

          <View className="flex-row space-x-3">
            <CardButton text="보내기" onPress={() => console.log('보내기')} />
            <View className="w-1" />
            <CardButton text="거래내역" onPress={() => console.log('거래내역')} />
          </View>
        </View>
      </View>

      {/* 메모리얼 소개 버튼 */}
      <TouchableOpacity className="bg-purple-600 p-4 rounded-full items-center mb-[120px] mx-7">
        <Text className="text-white font-bold">메모리얼 알아보기</Text>
      </TouchableOpacity>

      {/* NFT 목록 */}
      <Text className="text-lg font-semibold text-black mb-2 mx-7">내 NFT 목록</Text>
      <View className="py-2 bg-purple-600">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          <View className="flex-row gap-2">
            {[1, 2, 3].map((_, i) => (
              <Image
                key={i}
                source={{ uri: 'https://via.placeholder.com/100' }}
                className="w-36 h-36 rounded-lg bg-gray-100"
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
