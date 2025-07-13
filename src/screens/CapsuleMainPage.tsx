import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

const CapsuleMainPage = () => {
  const screenHeight = Dimensions.get('window').height;
  const topOffset = screenHeight * 0.05;

  return (
    // 전체 화면 컨테이너
    <View className="flex-1 bg-white px-6">

      <View className="flex-1 justify-center items-center">
        <View className="w-full max-w-[400px]" style={{ marginTop: topOffset }}>


          <View className="gap-2 mb-8">
            <Text className="text-2xl font-bold text-black leading-tight">
              세상에 단 하나뿐인{'\n'}타임캡슐을 만들어보세요
            </Text>
            <Text className="text-base text-gray-50git fetch
0 leading-relaxed">
              IPFS 기술로 안전하게 보관되어{'\n'}수십 년이 지나도 그대로 간직될 수 있어요
            </Text>
          </View>

          {/* 타임캡슐 이미지 */}
          <View className="items-center w-full aspect-square">
            <Image
              source={require('../assets/images/capsule.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

        </View>
      </View>
    </View>
  );
};

export default CapsuleMainPage;
