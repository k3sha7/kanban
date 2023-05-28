export interface SubTaskAttributes {
  title: string;
  isCompleted: boolean;
}
export interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  status: string;
  statusId: number;
  subTasks?: SubTaskAttributes[];
}
export interface ColumnAttributes {
  id: number;
  name: string;
  tasks?: TaskAttributes[];
}
export interface BoardAttributes {
  id: number;
  name: string;
  columns: ColumnAttributes[];
}
export interface AddTaskForm {
  id: number;
  title: string;
  description?: string;
  subTasks?: SubTaskAttributes[];
  status?: ColumnAttributes;
}
export interface UpdateStatusPayload {
  destination: { droppableId: number; index: number };
  source: { droppableId: number; index: number };
  taskId: number;
  boardId: number;
}
export interface AddTaskPayload extends TaskAttributes {
  boardId: number;
}
export interface UpdateSubTaskStatusPayload {
  subTaskIndex: number;
  taskId: number;
  boardId: number;
  statusId: number;
  isCompleted: boolean;
}
export interface DeleteBoardPayload {
  boardId?: number;
}

export interface BoardActionType {
  updateStatus: (state: BoardAttributes[], payload: UpdateStatusPayload) => BoardAttributes[];
  addTask: (state: BoardAttributes[], payload: AddTaskPayload) => BoardAttributes[];
  updateSubTaskStatus: (state: BoardAttributes[], payload: UpdateSubTaskStatusPayload) => BoardAttributes[];
  addBoard: (state: BoardAttributes[], payload: BoardAttributes) => BoardAttributes[];
  deleteBoard: (state: BoardAttributes[], payload: DeleteBoardPayload) => BoardAttributes[];
  editBoard: (state: BoardAttributes[], payload: BoardAttributes) => BoardAttributes[];
}

export type BoardAction =
  | { type: 'updateStatus'; payload: UpdateStatusPayload }
  | { type: 'addTask'; payload: AddTaskPayload }
  | { type: 'updateSubTaskStatus'; payload: UpdateSubTaskStatusPayload }
  | { type: 'addBoard'; payload: BoardAttributes }
  | { type: 'deleteBoard'; payload: DeleteBoardPayload }
  | { type: 'editBoard'; payload: BoardAttributes };
