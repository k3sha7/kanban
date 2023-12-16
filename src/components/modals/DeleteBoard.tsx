import { BoardContextType, useBoard } from '../../contexts/BoardContext';
import { ModalContextType, useModal } from '../../contexts/ModalContext';
import Modal from '../Model';

const DeleteBoard = () => {
  const { boards, dispatch, selectedBoard, switchBoard } = useBoard();
  const { toggleModal } = useModal();

  const handelDelete = () => {
    dispatch({
      type: 'deleteBoard',
      payload: {
        boardId: selectedBoard?.id,
      },
    });
    toggleModal('deleteBoard', false);
    if (typeof boards[1]?.id === 'number') {
      switchBoard(boards[1]?.id);
    }
  };

  return (
    <Modal modalName='deleteBoard'>
      <>
        <h2 className='mb-4 text-xl font-semibold text-red-500'>Delete this board?</h2>
        <p className='text-sm text-slate-400'>
          Are you sure you want to delete the <b> Board </b> board? This action will remove all columns and tasks and
          cannot be reversed.
        </p>
        <div className='grid grid-cols-2 gap-4 pt-8'>
          <button className='btn bg-red-500' onClick={handelDelete}>
            Delete
          </button>
          <button className='btn bg-white text-purple' onClick={() => toggleModal('deleteBoard', false)}>
            Cancel
          </button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteBoard;
