import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import MypageCapsuleList from './MypageCapsuleList';

interface CapsuleItem {
  id: string;
  date: string;
  title: string;
}

interface MypageActionSectionProps {
  capsules: CapsuleItem[];
  headerText: string;
  buttonText: string;
}

const MypageActionSection = ({ capsules, headerText, buttonText }: MypageActionSectionProps) => {
  return (
    <>
      <MypageCapsuleList capsules={capsules} headerText={headerText} />
      <TouchableOpacity className="bg-[#60227C] rounded-full py-3 mt-4 mb-4">
        <Text className="text-white text-center text-xs">{buttonText}</Text>
      </TouchableOpacity>
    </>
  );
};

export default MypageActionSection;
