import React from 'react';
import { View, Text, TextProps } from 'react-native';
import MainInfoText from '../UI/MainInfoText';

interface MainInfoSetionProps {
  title?: string
  description1?: string
  description2?: string
  children?: React.ReactNode
}

export function MainInfoSection({ children, title, description1, description2 }: MainInfoSetionProps) {
  return (
    <View className="mx-7 flex mb-[250px]">
      <MainInfoText className="font-bold text-[30px] mb-4">{title}</MainInfoText>
      <View className="mb-4">
        <MainInfoText className="text-[#5E5E5E] font-bold">{description1}</MainInfoText>
        <MainInfoText className="text-[#5E5E5E] font-bold">{description2}</MainInfoText>
      </View>
      <View className="bg-[#F1F1F8] px-4 pt-4 rounded-3xl">{children}</View>
    </View>
  );
}

interface MainInfoSection1Props {
  title?: string
  description1?: string
  description2?: string
}

export function MainInfoSection1({ title, description1, description2 }: MainInfoSection1Props) {
  return (
    <View className="mb-4">
      <MainInfoText className="font-bold text-[18px] mb-2">{title}</MainInfoText>
      <MainInfoText className="text-[12px] text-[#5E5E5E] font-bold">{description1}</MainInfoText>
      <MainInfoText className="text-[12px] text-[#5E5E5E] font-bold">{description2}</MainInfoText>
    </View>
  );
}

interface MainInfoSection2Props {
  step?: string
  children?: React.ReactNode
}

export function MainInfoSection2({ step, children }: MainInfoSection2Props) {
  return(
    <View className="mb-4 flex-row items-center">
      <View className="bg-[#60227C] px-2 py-1 rounded-xl mr-4">
        <MainInfoText className="font-bold text-[16px] text-white">{step}</MainInfoText>
      </View>
      {children}
    </View>
  );
}

interface ColoredTextProps extends TextProps {
  color?: string;
  children: React.ReactNode;
}

export function ColoredText({ children, color = '#60227C', className, ...rest }: ColoredTextProps) {
  const combinedClassName = `text-[${color}] ${className || ''}`;
  return (
    <MainInfoText className={combinedClassName} {...rest}>
      {children}
    </MainInfoText>
  );
}
