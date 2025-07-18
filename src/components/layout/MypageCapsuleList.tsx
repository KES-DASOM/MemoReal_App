import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import TimeCapsuleCard from '../UI/CapsuleBox';
import { ColoredText } from './MainInfoSection';

interface CapsuleItem {
  id: string;
  date: string;
  title: string;
}

interface TimeCapsuleListProps {
  capsules: CapsuleItem[];
  headerText: string;
}

const MypageCapsuleList: React.FC<TimeCapsuleListProps> = ({ capsules, headerText }) => {
  return (
    <View className="py-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-xs font-semibold text-gray-800">{headerText} <ColoredText>{capsules.length}</ColoredText></Text>
        <TouchableOpacity>
          <Text className="text-xs text-[#5E5E5E]">더보기</Text>
        </TouchableOpacity>
      </View>
      {capsules.length > 0 ? (
        <FlatList
          data={capsules}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View className={index < capsules.length - 1 ? "mr-2" : ""}>
              <TimeCapsuleCard item={item} />
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 5 }}
        />
      ) : (
        <Text className="text-center text-[#5E5E5E] mt-10">
          표시할 타임캡슐이 없습니다.
        </Text>
      )}
    </View>
  );
};

export default MypageCapsuleList;
