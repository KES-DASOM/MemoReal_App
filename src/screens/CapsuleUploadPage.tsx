import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image} from 'react-native';
import * as Progress from 'react-native-progress';
import UnityView, { UnityModule } from '@azesmway/react-native-unity';

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

export default function CapsuleUploadPage() {
  const unityRef = useRef<UnityView>(null);
  const [pct, setPct] = useState(0.2);

  useEffect(() => {
    // 1초(1000ms)마다 실행
    const id = setInterval(() => {
      setPct(prev => {
        const next = +(prev + 0.03).toFixed(3); // 0.1씩 증가 (원하면 조정)
        return next >= 1 ? 0 : next; // 1.0 넘으면 0으로 리셋
      });
    }, 100);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => {
      clearInterval(id);
      // 컴포넌트 언마운트 시 Unity 플레이어 종료
      if (UnityModule) {
        UnityModule.destroy();
        console.log('UnityPlayer destroyed on unmount.');
      }
    };
  }, []);

  useEffect(() => {
    if (unityRef?.current) {
      const message: IMessage = {
        gameObject: 'gameObject',
        methodName: 'methodName',
        message: 'message',
      };
      unityRef.current.postMessage(
        message.gameObject,
        message.methodName,
        message.message,
      );
    }
  }, []);

  return (
    <View className="flex-1 bg-white px-4 justify-between">
      <View>
        <Text className="text-2xl mb-5 text-center">업로드</Text>

        {/* AR 삽입 예정 */}
        <View className="mt-8 w-11/12 h-4/5 self-center bg-grey2">
          <UnityView
            ref={unityRef}
            style={{flex: 1}} // 부모 View의 크기를 채우도록 설정
            onUnityMessage={result => {
              console.log('onUnityMessage', result.nativeEvent.message);
            }}
          />
        </View>
      </View>
      <Progress.Bar // ▮ 막대(bar) 형태
        progress={pct} // 0 ~ 1 사이
        width={null} // 전체 폭(flex)
        height={12}
        borderRadius={8}
        indeterminate={false} // true면 로딩 스피너 모드
        animated // 값 변할 때 부드럽게
        color="#60227C"
        className="mb-[50px]"
      />
    </View>
  );
}
