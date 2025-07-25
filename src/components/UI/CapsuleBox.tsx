import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface CapsuleItem {
  id: string;
  date: string;
  title: string;
  image: any;
}

interface TimeCapsuleCardProps {
  item: CapsuleItem;
}

const TimeCapsuleCard: React.FC<TimeCapsuleCardProps> = ({ item }) => {
  return(
    <TouchableOpacity className="w-36 rounded-3xl h-fit shadow-md shadow-black/100 bg-white mb-4">
      <View className="relative rounded-t-3xl bg-gray-400 h-28 mb-2 overflow-hidden">
        <Image
          source={item.image}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-1 left-1 px-1">
          <Text className="text-[8px] font-bold stroke-[0.1px]">오픈일</Text>
          <Text className="text-xs font-bold">{item.date}</Text>
        </View>
      </View>
      <Text className="font-bold text-sm px-2 pb-6" numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
    </TouchableOpacity>
  );
};

export default TimeCapsuleCard;
