import React from 'react';
import { View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { XIcon } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { MainInfoSection, MainInfoSection1, MainInfoSection2, ColoredText } from '../components/layout/MainInfoSection';
import MainInfoText from '../components/UI/MainInfoText'; // 새로 생성한 커스텀 Text 컴포넌트 임포트

export default function MainInfoPage() {

  const members = 1232;

  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white">
    <TouchableOpacity className="absolute right-4 top-4 z-10 p-2" onPress={handleGoBack}>
      <XIcon size={20} weight="bold" />
    </TouchableOpacity>

    <ScrollView className="flex-1">

      <View className="items-center mb-[250px]">
        <Image
          source={require('../assets/images/logo-full.png')}
          className="w-[150px] h-[168.5px] mt-40 mb-4" />
        <MainInfoText className="font-bold">
          <MainInfoText className="text-[#60227C]">추억</MainInfoText>을 영원히 간직하는
          <MainInfoText className="text-[#60227C]"> 디지털 타임캡슐</MainInfoText>
        </MainInfoText>
      </View>

      <View className="items-center mb-[250px]">
        <MainInfoText className="font-bold text-[16px] mb-2">지금 이 순간에도</MainInfoText>
        <MainInfoText className="font-bold text-[32px] mb-4 text-[#60227C]">{members.toLocaleString()}명이</MainInfoText>
        <MainInfoText className="font-bold text-[16px]">MemoReal과 함께 특별한 추억을 만들고 있어요!</MainInfoText>
      </View>

      <View className="items-center mb-[250px]">
        <MainInfoText className="font-bold text-[32px] text-[#60227C] mb-4">MemoReal이란?</MainInfoText>
        <View className="items-center mb-4">
          <MainInfoText className="text-[15px] font-bold">사진과 영상을 AR 기술을 통해 현실에서</MainInfoText>
          <MainInfoText className="text-[15px] font-bold">볼 수 있도록 소중한 추억을 <ColoredText>NFT</ColoredText>로 만들어</MainInfoText>
          <MainInfoText className="text-[15px] font-bold">블록체인에 영원히 보관하는 <ColoredText>디지털 타임 캡슐</ColoredText>입니다.</MainInfoText>
        </View>
        <View className="items-center">
          <MainInfoText className="text-[15px] font-bold">MemoReal은 지나간 추억이 앨범 속에</MainInfoText>
          <MainInfoText className="text-[15px] font-bold">머무르지 않고 시간이 흘러도 변하지 않는 형태로</MainInfoText>
          <MainInfoText className="text-[15px] font-bold">영원히 존재할 수 있도록 도와줍니다.</MainInfoText>
        </View>
      </View>

      <MainInfoSection
        title="알고 싶어요!"
        description1="여러분의 추억을 보관해 줄"
        description2="MemoReal의 기능을 소개합니다."
      >
        <MainInfoSection1
          title="⏱️ 타임락 기능"
          description1="다시 보고 싶을 미래에 열어볼 수 있어요!"
          description2="결혼 기념일, 특별한 이벤트 등 깜짝 선물로 완벽해요." />
        <MainInfoSection1
          title="🔮 AR 체험"
          description1="증강현실로 실제 공간과 상호작용하는 신기한 경험!"
          description2="마치 마법처럼 현실 세계에서 디지털 추억이 살아 움직여요." />
        <MainInfoSection1
          title="🎁 선물하기"
          description1="소중한 사람에게 추억을 NFT로 선물할 수 있어요."
          description2="영원히 보관되는 타임캡슐을 선물해보세요!" />
        <MainInfoSection1
          title="🔒 안전한 보관"
          description1="분실, 훼손 걱정 없이 IPFS 기술로 안전하게 보관!"
          description2="수백 년이 지나도 그대로 간직할 수 있어요." />
      </MainInfoSection>

      <MainInfoSection
        title="시작하는 방법"
        description1="추억을 보관하는 MemoReal, "
        description2="어떻게 시작할 수 있을까요?"
      >
        <MainInfoSection2 step="Step.1">
          <MainInfoText className="text-[16px] font-bold"><ColoredText>앱 다운로드</ColoredText>하기</MainInfoText>
        </MainInfoSection2>
        <MainInfoSection2 step="Step.1">
          <MainInfoText className="text-[16px] font-bold">소중한 <ColoredText>추억 업로드</ColoredText>하기</MainInfoText>
        </MainInfoSection2>
        <MainInfoSection2 step="Step.1">
          <MainInfoText className="text-[16px] font-bold">개봉 <ColoredText>날짜 설정</ColoredText>하기</MainInfoText>
        </MainInfoSection2>
        <MainInfoSection2 step="Step.1">
          <MainInfoText className="text-[16px] font-bold"><ColoredText>NFT</ColoredText>로 만들어 <ColoredText>영원히 간직</ColoredText>하기</MainInfoText>
        </MainInfoSection2>
      </MainInfoSection>

      <View className="items-center mb-[200px]">
        <MainInfoText className="text-[16px] font-bold">당신의 추억이 <ColoredText>MemoReal</ColoredText>과 함께라면</MainInfoText>
        <MainInfoText className="text-[16px] mb-4 font-bold">시간이 지나도 변하지 않는 특별한 <ColoredText>선물</ColoredText>이 됩니다.</MainInfoText>
        <MainInfoText className="text-[18px] font-bold">지금 <ColoredText>MemoReal</ColoredText>과 함께하세요.</MainInfoText>
      </View>
    </ScrollView>
    </View>
  );
}