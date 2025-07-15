import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useCapsuleStore } from '../../store/useCapsuleStore';
import TimeCapsuleCard from '../UI/CapsuleBox';

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
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        scrollEnabled={false}
        className="mx-9"
        renderItem={({ item }) => (
          <TimeCapsuleCard item={item} />
        )}
      />
    </View>
  );
};

export default TimeCapsuleSheet;
