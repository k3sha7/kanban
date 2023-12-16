import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BoardContextType, useBoard } from '../contexts/BoardContext';
import { ChevronDown, IconBoard } from '../assets';
import { ModalContextType, useModal } from '../contexts/ModalContext';

export default function NavDropdown() {
  const { boards, selectedBoard, switchBoard } = useBoard();
  const { toggleModal } = useModal();

  return (
    <div className=''>
      <p className='hidden text-2xl font-medium md:inline'>{selectedBoard?.name}</p>

      <Menu as='div' className='relative inline-block text-left md:hidden'>
        <Menu.Button className='flex items-center gap-2'>
          {selectedBoard?.name} <ChevronDown />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute left-0 mt-2 w-64 origin-top-left bg-dark-1 pt-3'>
            <p className='mb-4 pl-4 text-xs tracking-[2.4px]'>ALL BOARDS ({boards.length})</p>
            {boards.map((board) => (
              <Menu.Item key={board.id}>
                <button
                  className={
                    'mb-1 flex w-10/12 items-center rounded-r-full py-2 pl-4 ' +
                    (board.id === selectedBoard?.id ? 'activeNav' : 'defaultNav')
                  }
                  onClick={() => switchBoard(board.id)}
                >
                  <IconBoard />
                  <p className='pl-3'>{board.name}</p>
                </button>
              </Menu.Item>
            ))}
            <button
              className='flex items-center py-2 pl-4 text-purple hover:opacity-70'
              onClick={() => toggleModal('board', true)}
            >
              <IconBoard />
              <p className='pl-3'>+ Create New Board</p>
            </button>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
