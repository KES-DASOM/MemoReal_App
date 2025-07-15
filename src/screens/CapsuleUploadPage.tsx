import React, {useState, useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import * as Progress from 'react-native-progress';

export default function CapsuleUploadPage() {
  const [pct, setPct] = useState(0.2);
  
  useEffect(() => {
    // 1초(1000ms)마다 실행
    const id = setInterval(() => {
      setPct(prev => {
        const next = +(prev + 0.03).toFixed(3); // 0.1씩 증가 (원하면 조정)
        return next >= 1 ? 0 : next;           // 1.0 넘으면 0으로 리셋
      });
    }, 100);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(id);
  }, []);



  return (
    <View className='flex-1 bg-white px-4 justify-between'>
          <View>
            <Text className="text-2xl mb-5 text-center">업로드</Text>

            {/* AR 삽입 예정 */}
            <Image
              source={require('../assets/images/logo.png')}
              className="w-[78px] h-[78px] self-center"
            />
            
          </View>
          <Progress.Bar           // ▮ 막대(bar) 형태
            progress={pct}        // 0 ~ 1 사이
            width={null}          // 전체 폭(flex)
            height={12}
            borderRadius={8}
            indeterminate={false} // true면 로딩 스피너 모드
            animated              // 값 변할 때 부드럽게
            className='mb-[50px]'
            />

        </View>
  );
}
