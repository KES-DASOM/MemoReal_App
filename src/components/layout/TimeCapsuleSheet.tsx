import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useCapsuleStore } from '../../store/useCapsuleStore';

const TimeCapsuleSheet = () => {
  const { capsules } = useCapsuleStore();

  return (
    <View className="flex-1 my-10">
      <View className="flex-row justify-between mx-7">
        <Text className="font-bold text-[16px] mb-4 text-center">타임캡슐 찾아보기</Text>
        <TouchableOpacity>
          <Text className="text-black text-[14px]">더보기</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={capsules}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        className="mx-7"
        renderItem={({ item }) => (
          <TouchableOpacity className="mx-[2%] w-[46%] rounded-xl h-fit shadow-md shadow-black/100 bg-white overflow-hidden mb-4">
            <View className="rounded-t-xl bg-gray-400 h-32 mb-2" />

            <View className="px-1 pb-1">
              <Text className="text-xs text-black">오픈일</Text>
              <Text className="text-xs font-semibold">{item.date}</Text>
            </View>
            <Text className="font-semibold text-sm px-1 pb-3">{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TimeCapsuleSheet;
