import { create } from "zustand";

interface ProfileState {
  nickname: string;
  imageUrl: string;
  setProfile: (nickname: string, url: string) => void;
}

export const useProfileStroe = create<ProfileState>((set) => ({
    nickname: '',
    imageUrl: '',
    setProfile: (nickname, url) => set({
        nickname: nickname,
        imageUrl: url
    })
}))
