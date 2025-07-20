import {styled} from 'nativewind';
import React from 'react';
import {Text, TextProps} from 'react-native';

const StyledText = styled(Text, 'font-subFont');

interface MainInfoTextProps extends TextProps {}

const MainInfoText: React.FC<MainInfoTextProps> = ({
  className,
  style,
  ...rest
}) => {
  return <StyledText className={className} style={style} {...rest} />;
};

export default MainInfoText;
