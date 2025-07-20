import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CapsuleItem {
  id: string;
  date: string;
  title: string;
}

interface TimeCapsuleCardProps {
  item: CapsuleItem;
}

const TimeCapsuleCard: React.FC<TimeCapsuleCardProps> = ({ item }) => {
  return(
    <TouchableOpacity className="w-36 rounded-3xl h-fit shadow-md shadow-black/100 bg-white mb-4">
      <View className="rounded-t-3xl bg-gray-400 h-28 mb-2 relative">
        <View className="absolute bottom-1 left-1 px-1">
          <Text className="text-[8px]">오픈일</Text>
          <Text className="text-xs font-bold">{item.date}</Text>
        </View>
      </View>
      <Text className="font-bold text-sm px-2 pb-6" numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
    </TouchableOpacity>
  );
};

export default TimeCapsuleCard;
