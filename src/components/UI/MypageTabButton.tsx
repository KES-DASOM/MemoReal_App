// components/TabButton.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { cn } from '../../utils/cn';

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const MypageTabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity
      className={cn(
        "pt-2 pb-1 px-4 border-b-2",
        isActive ? "border-black" : "border-transparent"
      )}
      onPress={onPress}
    >
      <Text className={cn(
        "font-bold",
        isActive ? "text-black" : "text-[#B3B3B3]"
      )}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MypageTabButton;
