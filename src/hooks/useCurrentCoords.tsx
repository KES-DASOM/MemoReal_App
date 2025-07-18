// hooks/useCurrentCoords.ts
import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from '../utils/requestLocationPermission';
import type { Coords } from '../store/types';

export function useCurrentCoords() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getLocation = async (): Promise<Coords | null> => {
    setIsLoadingLocation(true);

    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('위치 권한이 필요합니다.');
      setIsLoadingLocation(false);
      return null;
    }

    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentCoords = { latitude, longitude };
          setCoords(currentCoords);
          setIsLoadingLocation(false);
          resolve(currentCoords);
        },
        (error) => {
          console.error('위치 에러', error);
          Alert.alert('위치를 가져올 수 없습니다.');
          setIsLoadingLocation(false);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  };

  return { coords, isLoadingLocation, getLocation };
}
