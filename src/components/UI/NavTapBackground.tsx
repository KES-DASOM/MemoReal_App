import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import { styled } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';

const StyledView = styled(View);

const TAB_BAR_HEIGHT = 110; // 탭바의 기본 높이
const CENTRAL_BUTTON_WIDTH = 80; // NavTabCentralButton의 너비 (w-20 = 80px)
const HUMP_OVERLAP = 40; // 낙타혹이 탭바 위로 튀어나오는 높이 (조정 필요, 클수록 더 튀어나옴)
const HUMP_HORIZONTAL_OFFSET = 50; // 혹이 중앙 버튼에서 좌우로 얼마나 벌어지는지 (조정 필요, 클수록 혹이 넓고 둥글어짐)

export default function NavTapBackground() {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const totalTabBarHeight = TAB_BAR_HEIGHT + insets.bottom;

  // 위로 볼록 튀어나온 낙타혹 모양의 경로를 그리는 함수 (Cubic Bezier Curve 사용)
  const getHumpPath = () => {
    const topY = 40; // SVG 뷰박스 기준 탭바의 최상단 Y 좌표
    const bottomY = TAB_BAR_HEIGHT; // 탭바의 실제 하단 Y 좌표

    // 혹의 시작점과 끝점 X 좌표 (중앙 버튼 너비와 HUMP_HORIZONTAL_OFFSET을 고려)
    const humpLeftStartX = (screenWidth / 2) - (CENTRAL_BUTTON_WIDTH / 2) - HUMP_HORIZONTAL_OFFSET;
    const humpRightEndX = (screenWidth / 2) + (CENTRAL_BUTTON_WIDTH / 2) + HUMP_HORIZONTAL_OFFSET;

    // 혹의 최고점 (정점) X, Y 좌표
    const humpApexX = screenWidth / 2;
    const humpApexY = topY - HUMP_OVERLAP; // Y 좌표는 위로 갈수록 음수

    const controlPoint1X = (humpLeftStartX + humpApexX) / 2; // 왼쪽 제어점 X
    const controlPoint2X = (humpRightEndX + humpApexX) / 2; // 오른쪽 제어점 X

    return `M0,${topY} ` + // 왼쪽 상단 시작점 (0,0)에서 시작
           `L${humpLeftStartX},${topY} ` + // 혹 시작점까지 수평선 (탭바 상단)
           `C${controlPoint1X},${topY} ${controlPoint1X},${humpApexY} ${humpApexX},${humpApexY} ` + // 왼쪽 곡선: 시작점(humpLeftStartX,topY)에서 끝점(humpApexX,humpApexY)까지
           `C${controlPoint2X},${humpApexY} ${controlPoint2X},${topY} ${humpRightEndX},${topY} ` + // 오른쪽 곡선: 시작점(humpApexX,humpApexY)에서 끝점(humpRightEndX,topY)까지
           `L${screenWidth},${topY} ` + // 오른쪽 끝까지 수평선 (탭바 상단)
           `V${bottomY} ` + // 오른쪽 하단까지 수직선
           `H0 ` + // 왼쪽 하단까지 수평선
           `Z`; // 경로 닫기
  };
  return (
    <StyledView
      className="absolute bottom-0 left-0 right-0"
      style={{ height: totalTabBarHeight, elevation: 12 }}
    >
      <Svg height={totalTabBarHeight} width={screenWidth} style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <Path
          d={getHumpPath()}
          fill="white"
        />
      </Svg>
    </StyledView>
  );
}