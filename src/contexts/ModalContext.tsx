import { ReactNode, createContext, useContext, useState } from 'react';
import { TaskAttributes } from '../@types/board';
import AddBoard from '../components/modals/AddBoard';
import AddTask from '../components/modals/AddTask';
import ViewTask from '../components/modals/ViewTask';
import DeleteBoard from '../components/modals/DeleteBoard';

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

export const useModal = () => useContext(ModalContext);
