import React from 'react';
import { View, Image } from 'react-native';
import { styled } from 'nativewind';
import { NavTabIconProps } from '../../store/types';

const StyledView = styled(View);
const StyledImage = styled(Image);

const NavTabCentralButton: React.FC<NavTabIconProps> = ({ focused, iconOutline, iconFilled }) => {
  return (
    <StyledView
      className="self-center absolute -bottom-1/2 items-center justify-center w-20 h-20 rounded-full bg-[#60227C] shadow-lg shadow-[#60227C]/100 elevation-10"
      style={{
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
      }}
    >
      <StyledView className="items-center justify-center">
        <StyledImage
          source={focused ? iconFilled : iconOutline}
          className="w-[22px]"
          resizeMode="contain"
        />
      </StyledView>
    </StyledView>
  );
};

export default NavTabCentralButton;
