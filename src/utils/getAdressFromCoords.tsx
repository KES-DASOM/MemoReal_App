// utils/getAddressFromCoords.ts
export async function getAddressFromCoords(latitude: number, longitude: number): Promise<string | null> {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
      {
        method: 'GET',
        headers: {
  Authorization: 'KakaoAK aa46fc238f740f0d1fc3d934eb3aa182',
  Ka: 'sdk/1.0.0 os/android lang/ko-KR device/ReactNative',
}
      }
    );

    if (!response.ok) {
      console.error('카카오 API 실패:', response.status, await response.text());
      return null;
    }

    const json = await response.json();

    if (json.documents && json.documents.length > 0) {
      const { address, road_address } = json.documents[0];
      if (road_address) return road_address.address_name;
      if (address) return address.address_name;
    }

    return null;
  } catch (error) {
    console.error('주소 변환 중 오류:', error);
    return null;
  }
}
