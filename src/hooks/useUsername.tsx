import { create } from 'zustand'

type Username = {
    username:string;
    setUsername: (value:string) => void;
}

export const useUsername = create<Username>((set) => ({
    username: '',
    setUsername: (newUser:string) => set((state: Username) => ({ username: newUser })),
  }))