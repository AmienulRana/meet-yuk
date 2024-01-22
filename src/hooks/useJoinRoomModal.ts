
import { create } from 'zustand';

interface JoinRoomModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useJoinModal = create<JoinRoomModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useJoinModal;
