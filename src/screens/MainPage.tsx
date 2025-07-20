import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BellIcon, PlusIcon, CaretDoubleRightIcon } from 'phosphor-react-native';
import { useWalletStore } from '../store/useWalletStore';
import CustomButton from '../components/UI/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import TimeCapsuleSheet from '../components/layout/TimeCapsuleSheet';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../store/types';

type Props = NativeStackScreenProps<MainStackParamList, 'MainPage'>;

const MainPage: React.FC<Props> = ({ navigation }) => {

  const { hasWallet, balance, createWallet } = useWalletStore();

  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const bottomSheetTopPosition = SCREEN_HEIGHT * 0.5;

  const days = '100';
  const digits = days.split('');

  return (
    <View className="flex-1 bg-white pt-3">
      {/* 상단 날짜 및 알림 */}
      <View className="flex-row justify-between items-center mb-4 mx-7">
        <View>
          <Text className="text-sm font-bold text-black">메모리얼에서 추억을 보관한 지</Text>
          <View className="flex-row items-center">
            {digits.map((digit, index) => (
              <View
                key={index}
                className="w-6 h-6 mr-1 my-1 bg-white justify-center items-center shadow-md shadow-black/100"
              >
                <Text className="text-[#60227C] font-bold">{digit}</Text>
              </View>
            ))}
            <Text className="ml-1 text-sm font-bold text-black">일 째</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>{console.log('Bell 누름');}} >
          <BellIcon size={24} weight="bold" />
        </TouchableOpacity>
      </View>

      {/* 잔액 카드 */}
      <View className="bg-white h-[180px] items-center justify-center mb-6 shadow-lg shadow-black/100">
        {!hasWallet ? (
        <View className="px-6 py-3 rounded-lg">
          <TouchableOpacity className="flex-row items-center justify-center" onPress={createWallet}>
            <View className="bg-white flex items-center justify-center mr-2 h-10 w-10 rounded-full shadow-md shadow-black/100">
              <PlusIcon size={16} weight="bold" />
            </View>
            <Text className="text-[#5E5E5E] font-bold text-[20px]">새 지갑 생성하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="items-center justify-center bg-white rounded-3xl w-[84%] h-[85%] shadow-md shadow-black/100">
          <View className="w-full px-4 mb-2">
            <Image
              source={require('../assets/images/logo-icon.png')}
              className="w-[18px] h-[23px]"
            />
          </View>
          <Text className="text-2xl font-bold text-black mb-2">${balance}</Text>
          <CustomButton
            className="bg-[#60227C] py-[10px] px-[40px] rounded-full mb-2"
            textClassName="color-white text-[16px]"
            onPress={()=>{console.log('거래내역 누름');}}
            >
            거래내역
          </CustomButton>
        </View>
      )}
      </View>

      {/* 메모리얼 소개 버튼 */}
      <TouchableOpacity onPress={() => navigation.navigate('MainInfoPage')}>
      <LinearGradient
        colors={['#E1AFD1', '#7469B6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="items-center justify-center mx-7 px-1 py-1 rounded-full">
        <View className="flex-row border border-white w-full rounded-full py-2.5 items-center justify-center">
          <Text className="text-white font-bold text-center mr-2">
            메모리얼 알아보기
          </Text>
          <CaretDoubleRightIcon size={20} color="#ffffff" weight="bold" />
        </View>
      </LinearGradient>
      </TouchableOpacity>
      <View style={{ height: bottomSheetTopPosition }} />

      {/* NFT 목록 */}
      <TimeCapsuleSheet
        initialTop={bottomSheetTopPosition} // TimeCapsuleSheet에 시작 위치를 props로 전달합니다.
      />
    </View>
  );
};

export default MainPage;
