import { DraggableProvided } from 'react-beautiful-dnd';
import { TaskAttributes } from '../@types/board';
import { useModal, ModalContextType } from '../contexts/ModalContext';

interface TaskProps {
  task: TaskAttributes;
  provided: DraggableProvided;
}

const Task = ({ task, provided }: TaskProps) => {
  const { toggleModal } = useModal() as ModalContextType;

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => toggleModal('viewTask', true, task)}
      className='pb-6'
    >
      <div className='w-full min-w-[18rem] rounded-md bg-dark-2 px-4 py-6 hover:outline hover:outline-dark-1'>
        <p className='mb-2 text-white'>{task.title}</p>
        <span className='text-xs'>
          {task.subTasks?.filter((subTask) => subTask.isCompleted).length}
          {' of '}
          {task.subTasks?.length} subTasks
        </span>
      </div>
    </div>
  );
};

export default Task;
