import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown, Cross, IconPlus } from '../../assets';
import { Fragment, useEffect } from 'react';
import { BoardContextType, useBoard } from '../../contexts/BoardContext';
import { useController, useFieldArray, useForm } from 'react-hook-form';
import Modal from '../Model';
import { ModalContextType, useModal } from '../../contexts/ModalContext';
import { AddTaskForm } from '../../@types/board';

const AddTask = () => {
  const { selectedBoard, dispatch } = useBoard();
  const { toggleModal } = useModal();

  const {
    register,
    watch,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: '',
      subTasks: [{ title: '', isCompleted: false }],
      id: Date.now(),
      description: '',
      status: selectedBoard?.columns[0],
    },
  });

  const {
    field: { value, onChange },
  } = useController({ name: 'status', control });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subTasks',
  });

  const watchFieldArray = watch('subTasks');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray?.[index],
    };
  });

  const addField = () => {
    if (fields.length >= 5) return;
    append({ title: '', isCompleted: false });
  };

  const onSubmit = (form: AddTaskForm) => {
    console.log({ form, errors, status: form.status, id: selectedBoard?.id });
    if (form.status && typeof selectedBoard?.id === 'number') {
      const payload = {
        ...form,
        boardId: selectedBoard?.id,
        status: form.status.name,
        statusId: form.status.id,
      };
      dispatch({
        type: 'addTask',
        payload,
      });
      toggleModal('addTask', false);
    }
  };

  useEffect(() => {
    reset({
      title: '',
      subTasks: [{ title: '', isCompleted: false }],
      id: Date.now(),
      description: '',
      status: selectedBoard?.columns[0],
    });
  }, [selectedBoard]);

  return (
    <Modal modalName='addTask'>
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <h3 className='text-lg'>Add New Task</h3>
        <div className='my-4'>
          <label className='label'>Title</label>
          <input
            className={errors.title && 'border-red-500 focus:border-red-600'}
            {...register('title', { required: true })}
          />
        </div>
        <div className='my-4'>
          <label className='label'>Description</label>
          <textarea {...register('description')} spellCheck='false' rows={4} />
        </div>
        <div className='my-4'>
          <label className='label'>Sub tasks</label>
          {controlledFields.map((item, index) => {
            return (
              <div key={item.id} className='mb-3 flex'>
                <input
                  className={errors?.subTasks?.[index] && 'border-red-500 focus:border-red-600'}
                  {...register(`subTasks.${index}.title`, {
                    required: true,
                  })}
                />
                <button className='p-3' onClick={() => remove(index)}>
                  <Cross />
                </button>
              </div>
            );
          })}
          {fields.length !== 5 && (
            <button onClick={addField} type='button' className='btn w-full bg-white text-purple hover:opacity-90'>
              <IconPlus />
              <span className='ml-2'>Add new Subtask</span>
            </button>
          )}
        </div>
        <div className='my-4'>
          <label className='label'>Status</label>
          <Listbox value={value} onChange={onChange}>
            <div className='relative mt-1'>
              <Listbox.Button className='input'>
                <span className='block truncate'>{value?.name}</span>
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
                  {selectedBoard?.columns.map((status) => {
                    return (
                      <Listbox.Option
                        key={status.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-4 pr-4 ${active ? 'bg-purple' : 'text-gray-900'}`
                        }
                        value={status}
                      >
                        {status.name}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <button type='submit' className='btn bg-purple text-white'>
          Create Task
        </button>
      </form>
    </Modal>
  );
};

export default AddTask;
