import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { GearIcon } from 'phosphor-react-native';
import MypageTabButton from '../components/UI/MypageTabButton';
import MypageCapsuleList from '../components/layout/MypageCapsuleList';
import useMypageTabStore from '../store/useMypageTabStore';

const createdCapsules = [
  { id: '1', date: '2023.01.15', title: '작성한 제목 첫번째 캡슐' },
  { id: '2', date: '2023.01.15', title: '작성한 제목 두번째 캡슐' },
  { id: '3', date: '2023.01.15', title: '세번째 캡슐 긴 제목은 이렇게 됩니다' },
];

const openedCapsules = [
  { id: '4', date: '2023.01.15', title: '열어본 캡슐 1' },
  { id: '5', date: '2023.02.20', title: '열어본 캡슐 2' },
];

const giftedCapsules = [
  { id: '6', date: '2023.01.15', title: '선물받은 캡슐 A' },
];

export default function MyPage() {

  const { activeTab, setActiveTab } = useMypageTabStore();

  const renderContent = () => {
    switch (activeTab) { //switch case ㅋㅋ
      case 'create':
        return (
          <>
            <MypageCapsuleList capsules={createdCapsules} headerText="제작한 타임캡슐" />
            <TouchableOpacity className="bg-[#60227C] rounded-full py-3 mt-4 mb-4">
              <Text className="text-white text-center text-xs">타임캡슐 만들러 가기</Text>
            </TouchableOpacity>
          </>
        );
      case 'open':
        return (
          <>
            <MypageCapsuleList capsules={openedCapsules} headerText="열어본 타임캡슐" />
            <TouchableOpacity className="bg-[#60227C] rounded-full py-3 mt-4 mb-4">
              <Text className="text-white text-center text-xs">오픈 가능한 타임캡슐 열어보기</Text>
            </TouchableOpacity>
          </>
        );
        case 'gift':
        return (
          <>
            <MypageCapsuleList capsules={giftedCapsules} headerText="선물받은 타임캡슐" />
            <TouchableOpacity className="bg-[#60227C] rounded-full py-3 mt-4 mb-4">
              <Text className="text-white text-center text-xs">오픈 가능한 타임캡슐 열어보기</Text>
            </TouchableOpacity>
          </>
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
          <View className="w-16 h-16 border border-[#60227C] rounded-full bg-gray-300" />
          <Text className="text-base font-medium">할일외면하기</Text>
          <TouchableOpacity>
            <Text className="text-xs text-[#B3B3B3]">로그아웃</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
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
}
