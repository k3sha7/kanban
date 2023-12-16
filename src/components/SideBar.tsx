import { IconBoard, IconHide } from '../assets';
import { BoardContextType, useBoard } from '../contexts/BoardContext';
import { ModalContextType, useModal } from '../contexts/ModalContext';

interface Props {
  toggleSideNav: () => void;
}

const SideBar = ({ toggleSideNav }: Props) => {
  const { boards, selectedBoard, switchBoard } = useBoard();
  const { toggleModal } = useModal();

  return (
    <div className='hidden h-full min-w-[288px] flex-col justify-between overflow-hidden border-r border-dark-1 bg-dark-2 pt-4 pb-8 text-gray md:flex'>
      <div>
        <p className='mb-4 pl-8 text-xs tracking-[2.4px]'>ALL BOARDS ({boards.length})</p>
        {boards.map((board) => (
          <button
            key={board.id}
            className={
              'mb-1 flex w-64 items-center rounded-r-full py-2 pl-8 ' +
              (board.id === selectedBoard?.id ? 'activeNav' : 'defaultNav')
            }
            onClick={() => switchBoard(board.id)}
          >
            <IconBoard />
            <p className='pl-3'>{board.name}</p>
          </button>
        ))}
        <button
          className='flex items-center py-2 pl-8 text-purple hover:opacity-70'
          onClick={() => toggleModal('board', true)}
        >
          <IconBoard />
          <p className='pl-3'>+ Create New Board</p>
        </button>
      </div>
      <div className='ml-6 w-60'>
        {/* Theme switch */}

        {/* <div className='h-12 rounded-md bg-dark-3'>
          <div className='flex h-full w-full flex-col items-center justify-center'>
            <div className='flex items-center justify-center'>
              <IconSun />
              <div
                className={
                  'mx-3 flex h-5 w-10 items-center rounded-full px-1 transition ' +
                  (true ? 'bg-purple' : 'bg-slate-300')
                }
                // onClick={() => setMode(!mode)}
              >
                <div
                  className={
                    'h-4 w-4 transform rounded-full bg-white shadow-md transition ' + (true && 'translate-x-4')
                  }
                ></div>
              </div>
              <IconMoon />
            </div>
          </div>
        </div> */}
        <button className='flex items-center py-4 font-medium' onClick={toggleSideNav}>
          <IconHide /> Hide Sidebar
        </button>
      </div>
    </div>
  );
};

export default SideBar;
