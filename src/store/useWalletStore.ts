import { create } from 'zustand';

interface WalletState {
  hasWallet: boolean;
  balance: string;
  createWallet: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  hasWallet: false,
  balance: 0,
  createWallet: () => //임시로 일단...
    set({
      hasWallet: true,
      balance: '1,008',
    }),
}));
