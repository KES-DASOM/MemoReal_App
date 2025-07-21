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
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CaretLeft,
  SquaresFour,
  DotsThree,
  X,
} from 'phosphor-react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import CustomButton from '../components/UI/CustomButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const COLLAPSED_Y = SCREEN_HEIGHT * 0.52;
const EXPANDED_Y = SCREEN_HEIGHT * 0.15;
const MAX_SELECTION = 3;

export default function CapsulePicturePage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [tempSelected, setTempSelected] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState(false);

  const translateY = useRef(new Animated.Value(COLLAPSED_Y)).current;
  const panStart = useRef(0);

  const requestGalleryPermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY;

    const result = await request(permission);

    if (result === RESULTS.BLOCKED) {
      Alert.alert('권한 필요', '사진 접근 권한이 꺼져 있어요. 설정에서 권한을 허용해주세요.', [
        { text: '취소', style: 'cancel' },
        { text: '설정 열기', onPress: () => Linking.openSettings() },
      ]);
      return false;
    }

    return result === RESULTS.GRANTED;
  };

  const openSystemGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 });
    if (result.didCancel || !result.assets) return;

    const uris = result.assets.map((a: Asset) => a.uri).filter(Boolean) as string[];
    setGalleryImages(prev => [...new Set([...prev, ...uris])]);
  };

  useEffect(() => {
    openSystemGallery();
  }, []);

  const toggleSelect = (uri: string) => {
    setTempSelected(prev => {
      const updated = new Set(prev);
      if (updated.has(uri)) {
        updated.delete(uri);
      } else {
        if (updated.size >= MAX_SELECTION) {
          Alert.alert('선택 제한', `이미지는 최대 ${MAX_SELECTION}장까지 선택할 수 있어요.`);
          return prev;
        }
        updated.add(uri);
      }
      return new Set(updated);
    });
  };

  const confirmSelection = () => {
    const finalSelection = Array.from(tempSelected);
    setSelectedImages(finalSelection);
    setIsExpanded(false);
    Animated.spring(translateY, { toValue: COLLAPSED_Y, useNativeDriver: false }).start();
  };

  const goToFormPage = () => {
    const selected = Array.from(tempSelected);
    if (selected.length > 0) {
      navigation.navigate('CapsuleFormPage', { imageUris: selected });
    } else {
      Alert.alert('이미지 미선택', '최소 1장의 이미지를 선택해 주세요.');
    }
  };

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
        setIsExpanded(shouldExpand);
        Animated.spring(translateY, {
          toValue: shouldExpand ? EXPANDED_Y : COLLAPSED_Y,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const combinedSelected = Array.from(tempSelected);

  return (
    <View className="flex-1 bg-white">
      {/* 상단 헤더 */}
      <View className="flex-row items-center justify-between px-4 border-b border-gray-400 py-4 mb-4">
        <Pressable onPress={() => navigation.goBack()}>
          <CaretLeft size={20} color="black" weight="bold" />
        </Pressable>
        <Text className="text-base font-bold text-black">사진/영상 선택</Text>
        <Pressable onPress={goToFormPage}>
          <Text className={`text-base ${combinedSelected.length ? 'text-black' : 'text-gray-400'}`}>다음</Text>
        </Pressable>
      </View>

      {/* 대표 이미지 슬라이드 */}
      {combinedSelected.length > 0 && (
        <View className="items-center py-2">
          <FlatList
            data={combinedSelected}
            horizontal
            keyExtractor={(uri, idx) => `${uri}-${idx}`}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={SCREEN_WIDTH * 0.8 + 16}
            snapToAlignment="center"
            contentContainerStyle={{
              paddingHorizontal: (SCREEN_WIDTH - SCREEN_WIDTH * 0.8) / 2,
            }}
            renderItem={({ item }) => (
              <View
                className="bg-gray-200 rounded-xl overflow-hidden"
                style={{ width: SCREEN_WIDTH * 0.8, aspectRatio: 1, marginRight: 16 }}
              >
                <Image source={{ uri: item }} className="w-full h-full" resizeMode="cover" />
              </View>
            )}
          />
        </View>
      )}

      {/* 바텀시트 */}
      <Animated.View
        style={{
          position: 'absolute',
          top: translateY,
          left: 0,
          right: 0,
          bottom: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 10,
        }}
        className="bg-white rounded-t-3xl"
        {...panResponder.panHandlers}
      >
        <View className="flex-1 px-5 pt-4">
          <View className="items-center mb-3">
            <View className="w-12 h-1 bg-gray-300 rounded-full" />
          </View>

          {isExpanded && (
            <View className="flex-row justify-between items-center mb-4">
              <Pressable onPress={() => {
                setIsExpanded(false);
                Animated.spring(translateY, {
                  toValue: COLLAPSED_Y,
                  useNativeDriver: false,
                }).start();
              }}>
                <X size={24} color="#6B7280" />
              </Pressable>

              <Text className="text-base font-bold text-black">선택한 이미지</Text>

              <CustomButton
                onPress={confirmSelection}
                disabled={!tempSelected.size}
                className={`px-4 py-1 rounded-full ${tempSelected.size ? 'bg-purple3' : 'bg-gray-200'}`}
                textClassName={`text-xs font-bold ${tempSelected.size ? 'text-white' : 'text-gray-400'}`}
              >
                선택
              </CustomButton>
            </View>
          )}

          {/* 썸네일 리스트 */}
          <FlatList
            data={galleryImages}
            keyExtractor={(uri, idx) => `${idx}`}
            numColumns={3}
            contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
            renderItem={({ item }) => {
              const selected = tempSelected.has(item);
              return (
                <Pressable onPress={() => toggleSelect(item)} style={{ flexBasis: '33.333%', padding: 4 }}>
                  <View
                    className={`rounded-xl overflow-hidden border-[2px] ${selected ? 'border-purple3' : 'border-transparent'} bg-gray-200`}
                    style={{ aspectRatio: 1 }}
                  >
                    <Image source={{ uri: item }} className="w-full h-full" resizeMode="cover" />
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </Animated.View>

      {/* Floating 버튼 */}
      {!isExpanded && (
        <View className="absolute flex-row justify-between items-center left-5 right-5" style={{ bottom: insets.bottom + 24 }}>
          <Pressable
            onPress={() => {
              setIsExpanded(true);
              Animated.spring(translateY, { toValue: EXPANDED_Y, useNativeDriver: false }).start();
            }}
          >
            <View
              className="flex-row items-center px-4 py-2 rounded-full bg-white"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
                elevation: 6,
              }}
            >
              <SquaresFour size={20} weight="fill" color="#000" style={{ marginRight: 8 }} />
              <Text className="text-base text-gray-800">전체</Text>
            </View>
          </Pressable>

          <Pressable onPress={openSystemGallery}>
            <View
              className="w-12 h-12 rounded-full bg-white items-center justify-center"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
                elevation: 6,
              }}
            >
              <DotsThree size={24} color="#000" />
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}
