import React, { useState , useEffect } from 'react';
import {
  Modal,
  Pressable,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { CaretLeft } from 'phosphor-react-native';
import CustomButton from '../components/UI/CustomButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CapsuleStackParamList } from '../store/types';

import { useCurrentCoords } from '../hooks/useCurrentCoords';
import { getAddressFromCoords } from '../utils/getAdressFromCoords';

type CapsuleFormPageRouteProp = RouteProp<CapsuleStackParamList, 'CapsuleFormPage'>;

export default function CapsuleFormPage() {
  const route = useRoute<CapsuleFormPageRouteProp>();
  const { imageUris = [] } = route.params ?? {};

  const [CapsuleOpenVisible, setCapsuleOpenVisible] = useState(false);

  const [OpenAtDate, setOpenAtDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [OpenAtTime, setOpenAtTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [CapsuleTitle, setCapsuleTitle] = useState('');
  const [CapsuleDescribe, setCapsuleDescribe] = useState('');
  const [selectedType, setSelectedType] = useState<'normal' | 'time'>('normal');

  const navigation = useNavigation<NativeStackNavigationProp<CapsuleStackParamList>>();

  const { coords, isLoadingLocation, getLocation } = useCurrentCoords();
  const [address, setAddress] = useState<string | null>(null);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const [rnCoords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const nextButtonFuction = () => {
    setCapsuleOpenVisible(true);
    handleGetCurrentAddress();
  };

  const handleGetCurrentAddress = async () => {
    const newCoords: { latitude: number; longitude: number } | null = await getLocation();

    if (newCoords) {
      setCoords(newCoords);
      setIsFetchingAddress(true);
      const result = await getAddressFromCoords(newCoords.latitude, newCoords.longitude);
      setAddress(result);
      setIsFetchingAddress(false);
    } else {
      console.log('좌표를 가져오지 못했습니다.');
    }
  };

  const CapsuleDate = {
    capsuleTitle: CapsuleTitle,
    capsuleDescribe: CapsuleDescribe,
    selectedType: selectedType,
    openTime: OpenAtDate,
    coords: rnCoords,
  };

  const UploadButtonFunction = () => {
    console.log('캡슐 데이터:', JSON.stringify(CapsuleDate));
    navigation.navigate('CapsuleUploadPage');
  };

  return (
    <View className='flex-1 bg-white'>
      <View className='flex-1 w-full'>
        <View className='flex-row items-center justify-between px-4 border-b border-gray-400 py-[16px] mb-[40px]'>
          <Pressable onPress={() => navigation.goBack()}>
            <CaretLeft size={20} color="black" weight="bold" />
          </Pressable>

          <Text className='text-[16px]'>내용 작성</Text>

          <Pressable onPress={() => nextButtonFuction()}>
            <Text className="text-[14px] text-black">다음</Text>
          </Pressable>
        </View>

        <View className='flex-1 items-start px-[20px] space-y-[10px]'>
          <View className="w-screen px-[20px] pb-[24px] border-b border-gray-400 self-center">
            <View className="flex-row">
              {imageUris.slice(0, 3).map((uri: string, index: number) => (
                <Image
                  key={index}
                  source={{ uri }}
                  className="w-[80px] h-[80px] rounded-xl mr-[12px]"
                  resizeMode="cover"
                />  
              ))}
            </View>
          </View>

          <TextInput
            value={CapsuleTitle}
            placeholder='이곳에 캡슐 이름을 작성해주세요.'
            placeholderTextColor="gray"
            onChangeText={setCapsuleTitle}
            multiline
            textAlign="left"
            textAlignVertical="top"
            className='mb-[] text-[16px]'
          />

          <View className="h-px bg-gray-400 w-screen self-center" />

          <TextInput
            multiline
            value={CapsuleDescribe}
            onChangeText={(text) => { setCapsuleDescribe(text); }}
            placeholder="이곳에 캡슐에 보관할 글을 작성해주세요."
            placeholderTextColor="gray"
            textAlign="left"
            textAlignVertical="top"
            className="text-[16px]"
          />

          <Modal
            visible={CapsuleOpenVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setCapsuleOpenVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setCapsuleOpenVisible(false)}>
              <View className="flex-1 justify-end bg-transparent">
                <TouchableWithoutFeedback onPress={() => null}>
                  <View className="w-screen relative rounded-t-2xl" style={{ height: '60%' }}>
                    <LinearGradient
                      colors={['rgba(0,0,0,0.15)', 'transparent']}
                      start={{ x: 0.5, y: 1 }}
                      end={{ x: 0.5, y: 0 }}
                      className="absolute top-[-30px] left-0 w-full h-[40px] z-0 rounded-t-2xl"
                      pointerEvents="none"
                    />

                    <View className="bg-white rounded-t-2xl p-6 z-10 h-full">
                      <Text className="text-lg font-bold mb-2">캡슐 등록</Text>

                      <View className="flex flex-col space-y-[42px]">
                        <Text className="text-[24px]">
                          {CapsuleTitle || '캡슐 이름을 지정해주세요.'}
                        </Text>

                        <View className="flex-row items-center">
                          <Text className="w-[80px] text-black font-bold">캡슐 종류</Text>
                          <View className="flex-row space-x-[20px]">
                            <Pressable
                              className="flex-row items-center space-x-1"
                              onPress={() => setSelectedType('normal')}
                            >
                              <View
                                className={`w-4 h-4 rounded-full border-2 ${
                                  selectedType === 'normal' ? 'border-purple3' : 'border-gray-400'
                                } items-center justify-center`}
                              >
                                {selectedType === 'normal' && (
                                  <View className="w-2 h-2 rounded-full bg-purple3" />
                                )}
                              </View>
                              <Text
                                className={`${
                                  selectedType === 'normal'
                                    ? 'text-purple3 font-semibold'
                                    : 'text-gray-400'
                                }`}
                              >
                                일반 캡슐
                              </Text>
                            </Pressable>

                            <Pressable
                              className="flex-row items-center space-x-1"
                              onPress={() => setSelectedType('time')}
                            >
                              <View
                                className={`w-4 h-4 rounded-full border-2 ${
                                  selectedType === 'time' ? 'border-purple3' : 'border-gray-400'
                                } items-center justify-center`}
                              >
                                {selectedType === 'time' && (
                                  <View className="w-2 h-2 rounded-full bg-purple3" />
                                )}
                              </View>
                              <Text
                                className={`${
                                  selectedType === 'time'
                                    ? 'text-purple3 font-semibold'
                                    : 'text-gray-400'
                                }`}
                              >
                                타임 캡슐
                              </Text>
                            </Pressable>
                          </View>
                        </View>

                        <View>
                          <View className="flex-row items-center">
                            <Text className="w-[80px] text-black font-bold">위치</Text>

                            {!address && !isFetchingAddress && (
                                <Text className="text-gray-400 underline">로딩중</Text>)}
                            {isFetchingAddress && (
                            <Text className="text-sm text-gray-500">주소를 가져오는 중...</Text>
                          )}

                          {address && (
                            <Text className="text-gray-600">{address}</Text>
                          )}
                          </View>
                        </View>

                        <View className="flex-row items-center space-x-4">
                          <Text className="w-[65px] text-black font-bold">오픈일</Text>
                          {selectedType === 'time' ? (
                            <View className="flex-row justify-center items-center space-x-3">
                              <Pressable onPress={() => setShowPicker(true)}>
                                <Text className="text-gray-600">
                                  {OpenAtDate.toLocaleDateString('ko-KR')}
                                </Text>
                              </Pressable>
                              <Pressable onPress={() => setShowTimePicker(true)}>
                                <Text className="text-gray-600">
                                  {OpenAtTime.toLocaleTimeString('ko-KR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                  })}
                                </Text>
                              </Pressable>
                            </View>
                          ) : (
                            <Text className="text-gray-400">지정되지 않음</Text>
                          )}
                        </View>

                        {selectedType === 'time' && showPicker && (
                          <DateTimePicker
                            value={OpenAtDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event, selectedDate) => {
                              if (Platform.OS === 'android') setShowPicker(false);
                              if (selectedDate) setOpenAtDate(selectedDate);
                            }}
                          />
                        )}

                        {selectedType === 'time' && showTimePicker && (
                          <DateTimePicker
                            value={OpenAtTime}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={(event, selectedTime) => {
                              if (Platform.OS === 'android') setShowTimePicker(false);
                              if (selectedTime) setOpenAtTime(selectedTime);
                            }}
                          />
                        )}

                        <View className="flex-row justify-between px-6 w-full">
                          <CustomButton
                            className="w-[120px] bg-white p-2 border border-gray-300 rounded-full"
                            textClassName="font-bold color-black text-[10px]"
                            onPress={() => setCapsuleOpenVisible(false)}
                          >
                            취소
                          </CustomButton>

                          <CustomButton
                            className="w-[120px] bg-purple3 p-2 rounded-full"
                            textClassName="font-bold color-white text-[10px]"
                            onPress={() => UploadButtonFunction()}
                          >
                            업로드
                          </CustomButton>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    </View>
  );
}
