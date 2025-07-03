import React from 'react';
import { View, Text, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../store/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CapsuleIndexPage'>;

const CapsuleIndexPage: React.FC<Props> = ({ navigation }) => {

  return (
    <View>
      <Text>타임캡슐-작업용 인덱스페이지</Text>
      <Text>작업 편의를 위해 생성한 임시페이지입니다</Text>
      <Button title="Capsule 메인페이지" onPress={() => navigation.navigate('CapsuleMainPage')} />
      <Button title="Capsule 사진 등록 페이지" onPress={() => navigation.navigate('CapsulePicturePage')} />
      <Button title="Capsule 작품 등록 페이지" onPress={() => navigation.navigate('CapsuleFormPage')} />
      <Button title="Capsule 업로드 페이지" onPress={() => navigation.navigate('CapsuleUploadPage')} />
    </View>
  );
};

export default CapsuleIndexPage;
