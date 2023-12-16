import {
  BoardAction,
  BoardAttributes,
  BoardActionType,
  DeleteBoardPayload,
  UpdateSubTaskStatusPayload,
  AddTaskPayload,
  UpdateStatusPayload,
} from '../@types/board';
import { badRequest, findBoardById, findColumnById } from '../utils/helpers';

const updateStatus = (state: BoardAttributes[], payload: UpdateStatusPayload) => {
  const sourceColumn = findColumnById(state, payload.boardId, payload.source.droppableId);
  const selectedTask = sourceColumn.tasks?.splice(payload.source.index, 1);

  if (!selectedTask) throw badRequest;

  const destinationColumn = findColumnById(state, payload.boardId, payload.destination.droppableId);
  destinationColumn.tasks?.splice(payload.destination.index, 0, selectedTask[0]);
};

const addTask = (state: BoardAttributes[], payload: AddTaskPayload) => {
  const taskData = findColumnById(state, payload.boardId, payload.statusId);
  const newTask = {
    id: payload.id,
    title: payload.title,
    description: payload.description,
    status: payload.status,
    statusId: payload.statusId,
    subTasks: payload.subTasks,
  };

  taskData?.tasks?.push(newTask);
};

const updateSubTaskStatus = (state: BoardAttributes[], payload: UpdateSubTaskStatusPayload) => {
  const subTasks = findColumnById(state, payload.boardId, payload.statusId).tasks?.find(
    (task) => task.id === payload.taskId,
  )?.subTasks;

  if (!subTasks) throw badRequest;

  subTasks[payload.subTaskIndex].isCompleted = !payload.isCompleted;
};

const addBoard = (state: BoardAttributes[], payload: BoardAttributes) => {
  return [...state, payload];
};

const deleteBoard = (state: BoardAttributes[], payload: DeleteBoardPayload) => {
  const index = state.findIndex((board) => board.id === payload.boardId);
  state.splice(index, 1);
};

const editBoard = (state: BoardAttributes[], payload: BoardAttributes) => {
  const board = findBoardById(state, payload.id);

  board.name = payload.name;
  board.columns = payload.columns;
};

const reducerAction: BoardActionType = {
  updateStatus,
  addTask,
  updateSubTaskStatus,
  addBoard,
  deleteBoard,
  editBoard,
};

export default function BoardReducer(state: BoardAttributes[], { type, payload }: BoardAction) {
  const copy = [...state];
  reducerAction[type](copy, payload);
  localStorage.setItem('boards', JSON.stringify(copy));
  
  return copy;
}
