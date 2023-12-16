import Task from '../components/Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useBoard } from '../contexts/BoardContext';
import { DropResult } from 'react-beautiful-dnd';
import { useModal } from '../contexts/ModalContext';

const Kanban = () => {
  const { selectedBoard, dispatch } = useBoard();
  const { toggleModal } = useModal();

  if (!selectedBoard) {
    return (
      <div className='grid content-center'>
        <h2>Create a new Board to get started.</h2>
        <button className='btn bg-purple'>
          <b>+</b> Create new Board
        </button>
      </div>
    );
  }

  const handelAddColumn = () => {
    toggleModal('editBoard', true);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    dispatch({
      type: 'updateStatus',
      payload: {
        destination: {
          droppableId: Number(destination.droppableId),
          index: destination.index,
        },
        source: {
          droppableId: Number(source.droppableId),
          index: source.index,
        },
        taskId: Number(draggableId),
        boardId: selectedBoard.id,
      },
    });
  };

  return (
    <div className='flex flex-grow overflow-scroll p-8 text-gray'>
      <DragDropContext onDragEnd={onDragEnd}>
        {selectedBoard.columns.map(({ id, name, tasks }) => (
          <div key={id} className='mr-8 h-full'>
            <h2 className='mb-4 text-xs uppercase tracking-[2.4px]'>
              <span className='mr-3 inline-block h-3 w-3 rounded-full bg-sky-400'></span>
              {name} {tasks?.length}
            </h2>
            <Droppable droppableId={String(id)} direction='vertical'>
              {(droppableProvided) => (
                <div
                  className={
                    'h-full w-72 overflow-y-scroll overflow-x-hidden ' +
                    (tasks?.length === 0 && 'rounded-lg border-2 border-dashed border-dark-1')
                  }
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  {tasks?.map((task, index) => (
                    <Task task={task} index={index} />
                  ))}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
      <div className='pt-8 h-full'>
        <div className='grid h-full min-w-[288px] place-content-center rounded-lg bg-gradient-to-b from-dark-2'>
          <button className='mb-36 text-2xl font-medium hover:text-purple' onClick={handelAddColumn}>
            + New Column
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
