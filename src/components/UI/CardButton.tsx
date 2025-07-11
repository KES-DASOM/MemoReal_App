// src/components/PurpleButton.tsx
import React from 'react';
import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native';

interface Props {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const CardButton: React.FC<Props> = ({ text, onPress }) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-purple-600 py-2 rounded-full w-[110px]"
    >
      <Text className="text-white font-semibold text-center">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CardButton;
