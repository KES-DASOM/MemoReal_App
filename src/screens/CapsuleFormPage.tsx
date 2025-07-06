import React, {useState} from 'react';
import { Modal, Pressable, View, Text, TextInput, Button, Image, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CapsuleFormPage() {
  const [CapsuleOpenVisible, setCapsuleOpenVisible] = useState(false);
  const [OpenAt, setOpenAt] = useState(new Date());

  const [showPicker, setShowPicker]       = useState(false);

  const [CapsuleTitle, setCapsuleTitle] = useState('');
  const [CapsuleDescribe, setCapsuleDescribe] = useState('');

  const [CapsuleCategory, setCapsuleCategory] = useState(1);
  // CapsuleCategory - 1 : 일반캡슐, 2 : 타임캡슐

   const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      if (event.type === 'dismissed') {      // 취소 버튼
        setShowPicker(false);                // 🆕 달력 닫기
        return;
      }
      /* OK 버튼 */
      if (selectedDate) setOpenAt(selectedDate);
      setShowPicker(false);                  // 🆕 달력 닫기
    } else {
      if (selectedDate) setOpenAt(selectedDate);
    }
  };

  return (
    <View className='flex-1 bg-white'>
    <View className='flex-1 w-full px-4'>
      <View className='flex items-center '>
        <Text className='text-2xl mb-5'>작품 등록</Text>
      </View>

      <View className='flex-1 items-start space-y-2'>
        <Image source={require('../assets/images/logo.png')}
        className='w-[78px] h-[78px]' />
        {/* 예시 이미지 입니다 */}
        <TextInput value={CapsuleTitle} placeholder='캡슐 이름을 작성하세요.' placeholderTextColor="black"
          onChangeText={setCapsuleTitle}
          multiline
          textAlign="left" 
          textAlignVertical="top"
          className='mb-0' />
    
        <View className='flex-row mb-3 '>
          <Button title='일반캡슐' onPress={() => setCapsuleCategory(1)} />
          <Button title='타임캡슐' onPress={() => setCapsuleCategory(2)} />
        </View>
        <TextInput value={CapsuleDescribe} placeholder='캡슐 내용을 작성하세요.' placeholderTextColor="black" 
          onChangeText={setCapsuleDescribe}
          multiline
          textAlign="left" 
          textAlignVertical="top"
          className='bg-gray-300 w-full h-[210px] mb-4 px-3' />
        <Text className='mb-4'>캡슐 오픈 설정</Text>
        <Button title='캡슐 오픈 설정' onPress={()=> setCapsuleOpenVisible(true)} />


      <Modal
          visible={CapsuleOpenVisible}
          transparent
          animationType="none"
          onRequestClose={() => setCapsuleOpenVisible(false)}
        >
          <View className="flex-1 items-center justify-center bg-black/40">
            <View className="w-4/5 rounded-xl bg-white p-6">
              <Text className="text-lg font-bold mb-2">캡슐 오픈 날짜</Text>
              <Text className="mb-4 text-gray-600">
                {OpenAt.toLocaleDateString('ko-KR')}
              </Text>

              <Pressable
                className="bg-blue-600 rounded py-2 mb-4"
                onPress={() => setShowPicker(true)}          
              >
                <Text className="text-center text-white font-semibold">
                  날짜 설정하기
                </Text>
              </Pressable>

              {showPicker && (                                
                <DateTimePicker
                  value={OpenAt}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                />
              )}
              <Pressable
                className="mt-2 bg-gray-200 rounded py-2"
                onPress={() => setCapsuleOpenVisible(false)}
              >
                <Text className="text-center">닫기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      <View><Button title='생성하기' /></View>
      </View>
    </View>
    </View>
  );
}
