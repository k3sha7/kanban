import { Dispatch, ReactNode, createContext, useContext, useReducer, useState } from 'react';
import data from '../data/data.json';
import { BoardAction, BoardAttributes } from '../@types/board';
import TaskReducer from './BoardReducer';
import { findBoardById } from '../utils/helpers';

interface BoardProviderProps {
  children: ReactNode;
}

export interface BoardContextType {
  boards: BoardAttributes[];
  selectedBoard: BoardAttributes | undefined;
  switchBoard: (id: number) => void;
  dispatch: Dispatch<BoardAction>;
}

export const BoardContext = createContext<BoardContextType | null>(null);

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const localState = localStorage.getItem('boards')
  let initialState = data.boards;
  if(localState) {
    initialState = JSON.parse(localState)
  }
  const [boards, dispatch] = useReducer(TaskReducer, initialState);
  const [selectedBoard, setSelectedBoard] = useState<BoardAttributes | undefined>(boards[0]);
  // const [showAlert, setShowAlert] = useState(false);

  const switchBoard = (id: number) => {
    try {
      const board = findBoardById(boards, id);
      setSelectedBoard(board)
    } catch (err) {
      // setShowAlert(true);
    }
  };


  return (
    <BoardContext.Provider
      value={{
        boards,
        selectedBoard,
        switchBoard,
        dispatch,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => { 
  const context = useContext(BoardContext)
  if(!context) throw new Error('Error initializing context')
  return context
};
