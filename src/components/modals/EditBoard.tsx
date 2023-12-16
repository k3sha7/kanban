import { Cross, IconPlus } from '../../assets';
import { BoardContextType, useBoard } from '../../contexts/BoardContext';
import { useController, useFieldArray, useForm } from 'react-hook-form';
import Modal from '../Model';
import { ModalContextType, useModal } from '../../contexts/ModalContext';
import { BoardAttributes } from '../../@types/board';
import { useEffect } from 'react';

interface Props {
  board: BoardAttributes;
}

const EditBoard = ({ board }: Props) => {
  const { dispatch } = useBoard();
  const { toggleModal } = useModal();

  const {
    register,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: board,
  });

  useController({ name: 'columns', control });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  const watchFieldArray = watch('columns');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray?.[index],
    };
  });

  const addField = () => {
    if (fields.length >= 5) return;
    append({ id: Date.now(), name: '', tasks: [] });
  };

  const onSubmit = (form: any) => {
    dispatch({
      type: 'editBoard',
      payload: form,
    });
    toggleModal('editBoard', false);
    reset();
  };
  
  useEffect(() => {
    reset({ ...board });
  }, [board]);

  return (
    <Modal modalName='editBoard'>
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <h3 className='text-lg'>Edit Board</h3>
        <div className='my-4'>
          <label className='label'>Name</label>
          <input
            className={errors.name && 'border-red-500 focus:border-red-600'}
            {...register('name', { required: true })}
          />
        </div>

        <div className='my-4'>
          <label className='label'>Columns</label>
          {controlledFields.map((item, index) => {
            return (
              <div key={item.id} className='mb-3 flex'>
                <input
                  className={errors?.columns?.[index] && 'border-red-500 focus:border-red-600'}
                  {...register(`columns.${index}.name`, {
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
        <button type='submit' className='btn bg-purple text-white'>
          Save Board
        </button>
      </form>
    </Modal>
  );
};

export default EditBoard;
