import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    return auth === 'granted';
  }

  if (Platform.OS === 'android') {
    console.log('🔍 Android 위치 권한 요청 시작');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한 요청',
          message: '이 앱이 사용자의 위치에 접근하려고 합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '거부',
          buttonPositive: '허용',
        }
      );

      console.log('🔐 권한 응답 결과:', granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          '위치 권한이 차단됨',
          '앱 설정에서 위치 권한을 수동으로 허용해주세요.',
          [
            {
              text: '설정으로 이동',
              onPress: () => {
                Linking.openSettings().catch(() => {
                  Alert.alert('오류', '설정을 열 수 없습니다.');
                });
              },
            },
            { text: '취소', style: 'cancel' },
          ]
        );
      }

      return false;
    } catch (err) {
      console.warn('권한 요청 중 오류', err);
      return false;
    }
  }

  return false;
}
