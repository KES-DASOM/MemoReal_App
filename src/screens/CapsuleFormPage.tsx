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
  //

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
    //전체 View태그 3개로 묶여있음 View1 -> View2 -> 제목 -> View3(본문 View태그)
    <View className='flex-1 bg-white'> 
      <View className='flex-1 w-full'>

        {/* 제목 View */}
        <View className='flex items-center border-b border-gray-400 py-[16px] mb-[40px]'>
          <Text className='text-xl'>내용 작성</Text>
        </View>


        {/* 본문 View */}
        <View className='flex-1 items-start px-[20px] space-y-[10px]'>
          {/* <Image source={require('../assets/images/logo.png')}
          className='w-[80px] h-[80px]' /> */}
          {/* 예시 이미지 입니다 */}

        <View className="w-screen px-[20px] pb-[24px] border-b border-gray-400 self-center">
          <View className="flex-row">
            <View className="w-[80px] h-[80px] rounded-xl bg-gray-300 mr-[12px]" />
            <View className="w-[80px] h-[80px] rounded-xl bg-gray-300 mr-[12px]" />
            <View className="w-[80px] h-[80px] rounded-xl bg-gray-300" />
          </View>
        </View>


        <TextInput value={CapsuleTitle} placeholder='이곳에 캡슐 이름을 작성해주세요.' placeholderTextColor="gray"
          onChangeText={setCapsuleTitle}
          multiline
          textAlign="left" 
          textAlignVertical="top"
          className='mb-[] text-[16px] ' />

        <View className="h-px bg-gray-400 w-screen self-center" />
        
        {/* <View className='flex-row mb-3 '>
          <Button title='일반캡슐' onPress={() => setCapsuleCategory(1)} />
          <Button title='타임캡슐' onPress={() => setCapsuleCategory(2)} />
        </View> */}


        <TextInput value={CapsuleDescribe} placeholder='이곳에 캡슐에 보관할 글을 작성해주세요.' placeholderTextColor="gray" 
          onChangeText={setCapsuleDescribe}
          multiline
          textAlign="left" 
          textAlignVertical="top"
          className='text-[16px]' />

        <Button title='캡슐 오픈 설정' onPress={()=> setCapsuleOpenVisible(true)} />


      <Modal
          visible={CapsuleOpenVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setCapsuleOpenVisible(false)}
        >
          <View className="flex-1 items-center justify-end">
            <View  style={{ height: '64.5%',  }} className="w-screen rounded-xl bg-white p-6 shadow-md border border-gray-400" >
              <Text className="text-lg font-bold mb-2">캡슐 등록</Text>

              <Text>{CapsuleTitle}</Text>


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
      </View>
    </View>
    </View>
  );
}
