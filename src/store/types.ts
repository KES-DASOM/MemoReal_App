import { ImageSourcePropType } from 'react-native';

export type CapsuleStackParamList = {
  CapsuleIndexPage: undefined;
  CapsuleMainPage: undefined;
  CapsulePicturePage: undefined;
  CapsuleFormPage: {
    imageUris: string[];
  };
  CapsuleUploadPage: undefined;
};

export type MainStackParamList = {
  MainPage: undefined;
  MainInfoPage: undefined;
};

export type MyPageStackParamList ={
  MyPage: undefined;
  MyPageSettingPage: undefined;
};

export type HomeTabParamList = {
  Home: undefined;
  Capsule: undefined;
  MyPage: undefined;
};

export interface NavTabIconProps {
  focused: boolean;
  iconOutline:ImageSourcePropType;
  iconFilled: ImageSourcePropType;
  label?: string;
}

export type Coords = {
  latitude: number;
  longitude: number;
};
