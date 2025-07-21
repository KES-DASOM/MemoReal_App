import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { GearIcon } from 'phosphor-react-native';
import MypageTabButton from '../components/UI/MypageTabButton';
import useMypageTabStore from '../store/useMypageTabStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyPageStackParamList } from '../store/types';
import MypageActionSection from '../components/layout/MypageActionSection';
import { useProfileStroe } from '../store/useProfileStore';

type Props = NativeStackScreenProps<MyPageStackParamList, 'MyPage'>;

const createdCapsules = [
  {  id: '1', title: '졸업 후 나의 모습', date: '2025.06.06', image: require('../assets/images/dummy/gradu.png') },
  {  id: '2', title: '제주도 여행의 추억', date: '2025.07.15', image: require('../assets/images/dummy/jeju.png') },
  {  id: '3', title: '새로운 시작을 위한 다짐', date: '2025.08.20', image: require('../assets/images/dummy/newyear.png') },
];

const openedCapsules = [
  { id: '4', title: '가족과의 소중한 시간', date: '2025.09.01', image: require('../assets/images/dummy/family.png') },
  { id: '5', title: '내 생애 첫 코딩 프로젝트', date: '2025.10.10', image: require('../assets/images/dummy/coding.png') },
];

const giftedCapsules = [
  { id: '6', title: '잊지 못할 여름 휴가', date: '2025.11.22', image: require('../assets/images/dummy/vacation.png') },
];

const MyPage: React.FC<Props> = ({ navigation }) => {
  const {nickname, imageUrl} = useProfileStroe()

  const { activeTab, setActiveTab } = useMypageTabStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return (
          <MypageActionSection
            capsules={createdCapsules}
            headerText="제작한 타임캡슐"
            buttonText="타임캡슐 만들러 가기"
          />
        );
      case 'open':
        return (
          <MypageActionSection
            capsules={openedCapsules}
            headerText="열어본 타임캡슐"
            buttonText="오픈 가능한 타임캡슐 열어보기"
          />
        );
      case 'gift':
        return (
          <MypageActionSection
            capsules={giftedCapsules}
            headerText="선물받은 타임캡슐"
            buttonText="오픈 가능한 타임캡슐 열어보기"
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <Text className="text-xl font-bold mb-4 mt-7 mx-7">마이페이지</Text>

      <View className="flex-row items-center justify-between bg-white rounded-2xl shadow-md shadow-black/100 mx-7 px-4 py-2 mb-6">
        <View className="flex-row items-center space-x-3">
          <Image src={imageUrl} className="w-16 h-16 border border-[#60227C] rounded-full bg-gray-300" />
          <Text className="text-base font-medium">{nickname}</Text>
          <TouchableOpacity>
            <Text className="text-xs text-[#B3B3B3]">로그아웃</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('MyPageSettingPage')}>
          <View className="w-6 h-6 items-center justify-center">
            <GearIcon size={24} color="#5E5E5E" weight="fill" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="mx-7 mb-4">
        <Text className="text-xs font-medium">나의 타임캡슐</Text>
      </View>
      <View className="flex-1 bg-white mx-7">
      <View className="flex-row justify-around items-center bg-white shadow-md shadow-black/10">
        <MypageTabButton
          title="제작하기"
          isActive={activeTab === 'create'}
          onPress={() => setActiveTab('create')}
        />
        <MypageTabButton
          title="열어보기"
          isActive={activeTab === 'open'}
          onPress={() => setActiveTab('open')}
        />
        <MypageTabButton
          title="선물하기"
          isActive={activeTab === 'gift'}
          onPress={() => setActiveTab('gift')}
        />
      </View>
      <ScrollView className="flex-1">
        {renderContent()}
      </ScrollView>
    </View>

    </ScrollView>
  );
};

export default MyPage;
