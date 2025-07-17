import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';
import { NavTabIconProps } from '../../store/types';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const NavTabIcon: React.FC<NavTabIconProps> = ({ focused, iconOutline, iconFilled, label }) => {
  return (
    <StyledView className="mt-3 items-center justify-center w-20">
      <StyledImage
        source={focused ? iconFilled : iconOutline}
        className="w-6 h-6"
      />
      <StyledText className={`text-xs text-[#AD88C6] ${focused ? 'opacity-100' : 'opacity-0'}`}>
        {label}
      </StyledText>
    </StyledView>
  );
};

export default NavTabIcon;
