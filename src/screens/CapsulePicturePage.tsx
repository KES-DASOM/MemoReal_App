import React, { useEffect, useRef, useState } from 'react';
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CaretLeft,
  CaretDown,
  X,
  SquaresFour,
  DotsThree,
} from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CustomButton from '../components/UI/CustomButton';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const COLLAPSED_Y = SCREEN_HEIGHT * 0.52;
const EXPANDED_Y = SCREEN_HEIGHT * 0.15;

export default function CapsulePicturePage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [tempSelected, setTempSelected] = useState<Set<string>>(new Set());
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [albums, setAlbums] = useState<{ title: string }[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const translateY = useRef(new Animated.Value(COLLAPSED_Y)).current;
  const panStart = useRef(0);
  const lastSelected = selectedImages.at(-1);

  useEffect(() => {
    const load = async () => {
      const permission =
        Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      const result = await request(permission);
      if (result !== RESULTS.GRANTED) return;

      const albumList = await CameraRoll.getAlbums({ assetType: 'Photos' });
      if (!albumList.length) return;

      const defaultAlbum = albumList[0].title;
      setAlbums(albumList);
      setSelectedAlbum(defaultAlbum);
      await loadGalleryImages(defaultAlbum);
    };
    load();
  }, []);

  useEffect(() => {
    const id = translateY.addListener(({ value }) => {
      setIsExpanded(value <= (COLLAPSED_Y + EXPANDED_Y) / 2);
    });
    return () => translateY.removeListener(id);
  }, []);

  const loadGalleryImages = async (albumTitle: string) => {
    try {
      const photos = await CameraRoll.getPhotos({
        first: 100,
        assetType: 'Photos',
        groupName: albumTitle,
      });
      const uris = photos.edges.map(edge => edge.node.image.uri);
      const first = uris.slice(0, 1);
      setGalleryImages(uris);
      setTempSelected(new Set(first));
      setSelectedImages(first);
      setSelectedAlbum(albumTitle);
    } catch {
      setGalleryImages([]);
      setTempSelected(new Set());
      setSelectedImages([]);
    }
  };

  const toggleSelect = (uri: string) => {
    setTempSelected(prev => {
      const updated = new Set(prev);
      updated.has(uri) ? updated.delete(uri) : updated.add(uri);
      return new Set(updated);
    });
  };

  const confirmSelection = () => {
    setSelectedImages(Array.from(tempSelected));
    Animated.spring(translateY, {
      toValue: COLLAPSED_Y,
      useNativeDriver: false,
    }).start();
  };

  const goToFormPage = () => {
    if (selectedImages.length > 0) {
      navigation.navigate('CapsuleFormPage', { imageUris: selectedImages });
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
        Animated.spring(translateY, {
          toValue: shouldExpand ? EXPANDED_Y : COLLAPSED_Y,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 */}
      <View className="flex-row items-center justify-between px-4 border-b border-gray-400 py-4 mb-10">
        <Pressable onPress={() => navigation.goBack()}>
          <CaretLeft size={20} color="black" weight="bold" />
        </Pressable>
        <Text className="text-base font-semibold text-black">사진/영상 선택</Text>
        <Pressable onPress={goToFormPage} disabled={!selectedImages.length}>
          <Text className={`text-base ${selectedImages.length ? 'text-black' : 'text-gray-400'}`}>다음</Text>
        </Pressable>
      </View>

      {/* 대표 이미지 */}
      <View className="items-center py-2">
        <View className="bg-gray-200 rounded-xl overflow-hidden w-[90%] aspect-[1/1]">
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
            <View className="flex-row justify-between items-center mb-4 relative">
              <Pressable onPress={() => translateY.setValue(COLLAPSED_Y)}>
                <X size={24} color="#6B7280" />
              </Pressable>

              <View className="flex-1 items-center relative">
                <View className="flex-row items-center justify-center" style={{ transform: [{ translateX: 20 }] }}>
                  <Text className="text-base font-semibold text-black">{selectedAlbum}</Text>
                  <Pressable onPress={() => setShowDropdown(!showDropdown)}>
                    <CaretDown size={16} color="#000" style={{ marginLeft: 6 }} />
                  </Pressable>
                </View>

                {showDropdown && (
                  <View className="absolute top-7 bg-white border border-gray-200 rounded-md shadow z-10 w-[150px]">
                    {albums.map(album => (
                      <Pressable
                        key={album.title}
                        onPress={() => {
                          loadGalleryImages(album.title);
                          setShowDropdown(false);
                        }}
                        className="px-4 py-2 border-b border-gray-100"
                      >
                        <Text className="text-gray-800 text-center">{album.title}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>

              <CustomButton
                onPress={confirmSelection}
                disabled={!tempSelected.size}
                className={`px-4 py-1 rounded-full ${tempSelected.size ? 'bg-purple3' : 'bg-gray-200'}`}
                textClassName={`text-xs font-semibold ${tempSelected.size ? 'text-white' : 'text-gray-400'}`}
              >
                선택
              </CustomButton>
            </View>
          )}

          {/* 이미지 목록 */}
          <FlatList
            data={galleryImages}
            numColumns={3}
            keyExtractor={(uri, idx) => `${idx}`}
            contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
            renderItem={({ item }) => {
              const selected = tempSelected.has(item);
              return (
                <Pressable onPress={() => toggleSelect(item)} className="flex-1 basis-1/3 p-1">
                  <View
                    className={`rounded-xl overflow-hidden border-[3px] ${
                      selected ? 'border-purple3' : 'border-transparent'
                    } bg-gray-200 aspect-[1/1]`}
                  >
                    <Image source={{ uri: item }} className="w-full h-full" />
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </Animated.View>

      {/* 플로팅 버튼 */}
      {!isExpanded && (
        <View
          className="absolute flex-row justify-between items-center left-5 right-5"
          style={{ bottom: insets.bottom + 24 }}
        >
          <Pressable
            onPress={() =>
              Animated.spring(translateY, {
                toValue: EXPANDED_Y,
                useNativeDriver: false,
              }).start()
            }
          >
            <View className="flex-row items-center px-4 py-2 rounded-full bg-white" style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 6,
            }}>
              <SquaresFour size={20} weight="fill" color="#000" style={{ marginRight: 8 }} />
              <Text className="text-base text-gray-800">전체</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => loadGalleryImages(selectedAlbum)}>
            <View className="w-12 h-12 rounded-full bg-white items-center justify-center" style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 6,
            }}>
              <DotsThree size={24} color="#000" />
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}
