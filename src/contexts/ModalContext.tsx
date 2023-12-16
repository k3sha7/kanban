import { ReactNode, createContext, useContext, useState } from 'react';
import { TaskAttributes } from '../@types/board';
interface BoardProviderProps {
  children: ReactNode;
}

export interface ModalContextType {
  modalStatus: ModalStatus;
  toggleModal: (name: keyof ModalStatus, value: boolean, task?: TaskAttributes) => void;
  selectedTask: TaskAttributes | undefined;
}

export const ModalContext = createContext<ModalContextType | null>(null);

const initialModalStatus = {
  addTask: false,
  viewTask: false,
  board: false,
  deleteBoard: false,
  editBoard: false,
};

export interface ModalStatus {
  addTask: boolean;
  viewTask: boolean;
  board: boolean;
  deleteBoard: boolean;
  editBoard: boolean;
}

export const ModalProvider = ({ children }: BoardProviderProps) => {
  const [modalStatus, setModalStatus] = useState(initialModalStatus);
  const [selectedTask, setSelectedTask] = useState<TaskAttributes>();

  const toggleModal = (name: keyof ModalStatus, value: boolean, task?: TaskAttributes) => {
    const modalStatusCopy = { ...modalStatus };
    modalStatusCopy[name] = value;
    setModalStatus(modalStatusCopy);
    if (task) setSelectedTask(task);
  };

  return (
    <ModalContext.Provider
      value={{
        modalStatus,
        toggleModal,
        selectedTask,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Error initializing context');
  return context;
};
