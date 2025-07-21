import { create } from 'zustand';

type Capsule = {
  id: string;
  title: string;
  date: string;
  image: any;
};

interface CapsuleState {
  capsules: Capsule[];
}

// 더미데이터(임시)
const DUMMY_CAPSULES: Capsule[] = [
  { id: '1', title: '졸업 후 나의 모습', date: '2025.06.06', image: require('../assets/images/dummy/gradu.png') },
  { id: '2', title: '제주도 여행의 추억', date: '2025.07.15', image: require('../assets/images/dummy/jeju.png') },
  { id: '3', title: '새로운 시작을 위한 다짐', date: '2025.08.20', image: require('../assets/images/dummy/newyear.png') },
  { id: '4', title: '가족과의 소중한 시간', date: '2025.09.01', image: require('../assets/images/dummy/family.png') },
  { id: '5', title: '내 생애 첫 코딩 프로젝트', date: '2025.10.10', image: require('../assets/images/dummy/coding.png') },
  { id: '6', title: '잊지 못할 여름 휴가', date: '2025.11.22', image: require('../assets/images/dummy/vacation.png') },
  { id: '7', title: '새로운 도전과 성장', date: '2025.12.31', image: require('../assets/images/dummy/Challenge.png') },
  { id: '8', title: '내일의 나에게 쓰는 편지', date: '2026.01.01', image: require('../assets/images/dummy/letter.png') },
  { id: '9', title: '버킷리스트 달성!', date: '2026.02.14', image: require('../assets/images/dummy/bukket.png') },
  { id: '10', title: '성공적인 프로젝트 마무리', date: '2026.03.01', image: require('../assets/images/dummy/Announcement.png') },
];

export const useCapsuleStore = create<CapsuleState>(() => ({
  capsules: DUMMY_CAPSULES,
}));
