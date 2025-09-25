import { create } from 'zustand';
import { Task } from '../types/task';

interface ModalState {
  isTaskModalOpen: boolean;
  taskToEdit: Task | null;
  openTaskModal: (task?: Task) => void;
  closeTaskModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isTaskModalOpen: false,
  taskToEdit: null,
  openTaskModal: (task = null) => set({ isTaskModalOpen: true, taskToEdit: task }),
  closeTaskModal: () => set({ isTaskModalOpen: false, taskToEdit: null }),
}));

export default useModalStore;