import React, { useRef, useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useCapsuleStore } from '../../store/useCapsuleStore';
import TimeCapsuleCard from '../UI/CapsuleBox';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface TimeCapsuleSheetProps {
  initialTop: number;
}

const TimeCapsuleSheet: React.FC<TimeCapsuleSheetProps> = ({ initialTop }) => {
  const { capsules } = useCapsuleStore();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const correctedSnapPoints = useMemo(() => [
    `${Math.round(100 - (initialTop / SCREEN_HEIGHT) * 100)}%`,
    '85%',
  ], [initialTop]);


  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={correctedSnapPoints}
      enablePanDownToClose={false}
      style={{ position: 'absolute', top: initialTop, left: 0, right: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 12,
       }}
    >
      <View className="flex-1 mt-3">
        <View className="flex-row justify-between ml-7">
          <Text className="font-bold text-[16px] mb-4 text-center">타임캡슐 찾아보기</Text>
        </View>
        <BottomSheetFlatList
          data={capsules}
          keyExtractor={(item) => item.id}
          numColumns={2}
          indicatorStyle={false}
          columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 25 }}
          className="mx-9 mb-[400px]"
          renderItem={({ item }) => (
            <TimeCapsuleCard item={item} />
          )}
        />
      </View>
    </BottomSheet>
  );
};

export default TimeCapsuleSheet;
