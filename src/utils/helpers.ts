import { BoardAttributes } from '../@types/board';

export const badRequest = new Error('400');

export const findBoardById = (boards: BoardAttributes[], boardId?: number) => {
  const board = boards.find((board) => board.id === boardId);
  if (!board) throw badRequest;
  return board;
};

export const findColumnById = (boards: BoardAttributes[], boardId: number, statusId: number) => {
  const column = findBoardById(boards, boardId).columns?.find((el: any) => el.id == statusId);
  if (!column) throw badRequest;
  return column;
};
