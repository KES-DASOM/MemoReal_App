import { create } from 'zustand';

interface MypageTabState {
  activeTab: 'create' | 'open' | 'gift';
  setActiveTab: (tab: 'create' | 'open' | 'gift') => void;
}

const useMypageTabStore = create<MypageTabState>((set) => ({
  activeTab: 'create',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useMypageTabStore;
