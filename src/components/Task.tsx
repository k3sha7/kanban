import { Draggable } from 'react-beautiful-dnd';
import { TaskAttributes } from '../@types/board';
import { useModal } from '../contexts/ModalContext';

interface TaskProps {
  task: TaskAttributes;
  index: number;
}

const Task = ({ task, index }: TaskProps) => {
  const { toggleModal } = useModal();
  const completed = task.subTasks?.filter((subTask) => subTask.isCompleted).length;

  return (
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => toggleModal('viewTask', true, task)}
          className='mb-6 w-full min-w-[18rem] rounded-md bg-dark-2 px-4 py-6 transition-colors hover:bg-dark-1/50'
        >
          <p className='mb-2 text-white'>{task.title}</p>
          <span className='text-xs'>
            {completed} of {task.subTasks?.length} subTasks
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
