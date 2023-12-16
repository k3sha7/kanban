import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown } from '../../assets';
import { Fragment, useEffect, useState } from 'react';
import { BoardContextType, useBoard } from '../../contexts/BoardContext';
import Modal from '../Model';
import { TaskAttributes } from '../../@types/board';

interface Props {
  task: TaskAttributes;
}

const ViewTask = ({ task }: Props) => {
  const { selectedBoard, dispatch } = useBoard();

  const [status, setStatus] = useState({ id: 0, name: '' });
  useEffect(() => {
    if (task) {
      setStatus({ id: task.statusId, name: task.status });
    }
  }, [task]);

  const handleCheckbox = (subTaskIndex: number, isCompleted: boolean) => {
    const payload = {
      subTaskIndex,
      taskId: task?.id,
      boardId: selectedBoard?.id as number,
      statusId: task?.statusId,
      isCompleted,
    };

    dispatch({
      type: 'updateSubTaskStatus',
      payload,
    });
  };

  const onChangeStatus = ({ id, name }: { id: number; name: string }) => {
    dispatch({
      type: 'updateStatus',
      payload: {
        destination: { droppableId: id, index: 0 },
        source: { droppableId: status.id, index: 0 },
        taskId: task?.id,
        boardId: selectedBoard?.id as number,
      },
    });
    setStatus({ id, name });
  };

  return (
    <Modal modalName='viewTask'>
      <form>
        <h3 className='text-lg'>{task?.title}</h3>
        <p className='py-4 text-gray'>{task?.description || 'No description'}</p>
        <div className='my-4'>
          <label className='label'>
            Subtasks {task?.subTasks?.filter((subTask) => subTask.isCompleted).length}
            {' of '}
            {task?.subTasks?.length}
          </label>
          {task?.subTasks?.map((sub, i) => (
            <label
              key={sub.title + String(i)}
              className={`my-2 flex items-center rounded-md bg-dark-3 p-3 text-sm ${
                sub.isCompleted && 'line-through opacity-70'
              }`}
            >
              <input
                type='checkbox'
                onClick={() => handleCheckbox(i, sub.isCompleted)}
                defaultChecked={sub.isCompleted}
              />
              {sub.title}
            </label>
          ))}
          <div className='my-4'>
            <label className='label'>Status</label>
            <Listbox value={status} onChange={onChangeStatus}>
              <div className='relative mt-1'>
                <Listbox.Button className='input'>
                  <span className='block truncate'>{status?.name}</span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <ChevronDown />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute mt-1 w-full overflow-y-scroll rounded-md bg-dark-3 shadow-lg '>
                    {selectedBoard?.columns.map(({ id, name }) => {
                      return (
                        <Listbox.Option
                          key={id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-4 pr-4 ${
                              active ? 'bg-purple' : 'text-gray-900'
                            }`
                          }
                          value={{ id, name }}
                        >
                          {name}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ViewTask;
