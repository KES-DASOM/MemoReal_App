import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, CaretDown, DotsThree, SquaresFour, X } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

// 화면 및 아이템 관련 상수
const SCREEN = Dimensions.get('window');
const COLLAPSED_Y = SCREEN.height * 0.5;
const EXPANDED_Y = SCREEN.height * 0.15;
const ITEM_MARGIN = 4;
const NUM_COLUMNS = 3;
const ITEM_WIDTH = (SCREEN.width - ITEM_MARGIN * 2 * NUM_COLUMNS - 32) / NUM_COLUMNS;

// 임시 이미지 데이터
const dummyImages = Array.from({ length: 20 }, (_, i) => ({
  id: `${i}`,
  uri: `https://via.placeholder.com/150?text=${i + 1}`,
}));

export default function CapsulePicturePage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // 상태 관리
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [tempSelected, setTempSelected] = useState<Set<string>>(new Set());
  const [selectedAlbum, setSelectedAlbum] = useState('최근 항목');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 바텀시트 위치 애니메이션
  const translateY = useRef(new Animated.Value(COLLAPSED_Y)).current;
  const panStart = useRef(0);

  // 바텀시트 위치 감지해서 확장 여부 업데이트
  useEffect(() => {
    const id = translateY.addListener(({ value }) => {
      setIsExpanded(value <= (COLLAPSED_Y + EXPANDED_Y) / 2);
    });
    return () => translateY.removeListener(id);
  }, []);

  // 바텀시트 드래그 제스처
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, g) => (panStart.current = g.dy),
      onPanResponderMove: (_, g) => {
        const offset = (isExpanded ? EXPANDED_Y : COLLAPSED_Y) + (g.dy - panStart.current);
        translateY.setValue(Math.max(EXPANDED_Y, Math.min(COLLAPSED_Y, offset)));
      },
      onPanResponderRelease: (_, g) => {
        const shouldExpand = g.dy < -30;
        Animated.spring(translateY, {
          toValue: shouldExpand ? EXPANDED_Y : COLLAPSED_Y,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // 이미지 선택 토글
  const toggleSelect = (uri: string) => {
    const updated = new Set(tempSelected);
    updated.has(uri) ? updated.delete(uri) : updated.add(uri);
    setTempSelected(updated);
  };

  // 선택 확정 후 바텀시트 내리기
  const confirmSelection = () => {
    setSelectedImages(Array.from(tempSelected));
    Animated.spring(translateY, { toValue: COLLAPSED_Y, useNativeDriver: false }).start();
  };

  const lastSelected = selectedImages.at(-1);

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 */}
      <View className="flex-row justify-between items-center px-6 pt-[8%] pb-3 border-b border-gray-300">
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#6B7280" />
        </Pressable>
        <Text className="text-base font-semibold text-black">사진/영상 선택</Text>
        <Text className="text-base text-black">다음</Text>
      </View>

      {/* 선택 이미지 미리보기 */}
      <View className="items-center py-5">
        <View className="bg-gray-200 rounded-xl overflow-hidden w-[90%] aspect-square">
          {lastSelected && (
            <Image source={{ uri: lastSelected }} className="w-full h-full" resizeMode="cover" />
          )}
        </View>
      </View>

      {/* 바텀시트 */}
      <Animated.View
        style={{
          position: 'absolute',
          top: translateY,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        className="bg-white rounded-t-3xl"
        {...panResponder.panHandlers}
      >
        <View className="flex-1 px-5 pt-4">
          {/* 핸들바 */}
          <View className="items-center mb-3">
            <View className="w-12 h-1 bg-gray-300 rounded-full" />
          </View>

          {/* 상단 컨트롤 (확장 시만) */}
          {isExpanded && (
            <View className="relative flex-row items-center justify-between mb-3">
              <Pressable onPress={() => translateY.setValue(COLLAPSED_Y)}>
                <X size={24} color="#6B7280" />
              </Pressable>

              {/* 앨범 선택 */}
              <View className="flex-row items-center">
                <Text className="text-base font-semibold text-black mr-1">{selectedAlbum}</Text>
                <Pressable onPress={() => setDropdownVisible(!dropdownVisible)}>
                  <CaretDown size={16} color="#6B7280" />
                </Pressable>
              </View>

              {/* 선택 버튼 */}
              <Pressable onPress={confirmSelection} disabled={tempSelected.size === 0}>
                <View
                  className={`px-3 py-1 rounded-full ${
                    tempSelected.size > 0 ? 'bg-purple-100' : 'bg-gray-200'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      tempSelected.size > 0 ? 'text-purple-700' : 'text-gray-400'
                    }`}
                  >
                    선택
                  </Text>
                </View>
              </Pressable>

              {/* 앨범 드롭다운 */}
              {dropdownVisible && (
                <View className="absolute top-full mt-2 left-[25%] w-[120px] bg-white border border-gray-300 rounded-xl shadow z-50">
                  {['최근 항목', '카메라', '다운로드'].map((name) => (
                    <Pressable
                      key={name}
                      className="py-2 px-4"
                      onPress={() => {
                        setSelectedAlbum(name);
                        setDropdownVisible(false);
                      }}
                    >
                      <Text className="text-sm text-black">{name}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* 이미지 리스트 */}
          <FlatList
            data={dummyImages}
            numColumns={NUM_COLUMNS}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
            renderItem={({ item }) => {
              const selected = tempSelected.has(item.uri);
              return (
                <Pressable onPress={() => toggleSelect(item.uri)} style={{ margin: ITEM_MARGIN }}>
                  <View
                    className={`rounded-xl overflow-hidden border-[3px] ${
                      selected ? 'border-purple-500' : 'border-transparent'
                    }`}
                    style={{ width: ITEM_WIDTH, aspectRatio: 1, backgroundColor: '#e5e7eb' }}
                  >
                    <Image source={{ uri: item.uri }} className="w-full h-full" />
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </Animated.View>

      {/* 플로팅 버튼 (바텀시트가 닫힌 상태에서만 표시) */}
      {!isExpanded && (
        <View
          className="absolute flex-row justify-between left-5 right-5"
          style={{ bottom: insets.bottom + 24 }}
        >
          <Pressable
            onPress={() =>
              Animated.spring(translateY, { toValue: EXPANDED_Y, useNativeDriver: false }).start()
            }
          >
            <View className="flex-row items-center px-4 py-2 rounded-full bg-white shadow">
              <SquaresFour size={20} weight="fill" color="#000" className="mr-2" />
              <Text className="text-base text-gray-800">전체</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => {}}>
            <View className="w-12 h-12 rounded-full bg-white items-center justify-center shadow">
              <DotsThree size={24} color="#000" />
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}
