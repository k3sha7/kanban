import Header from './components/Header';
import SideBar from './components/SideBar';
import Kanban from './pages/Kanban';
import AddBoard from './components/modals/AddBoard';
import AddTask from './components/modals/AddTask';
import ViewTask from './components/modals/ViewTask';
import DeleteBoard from './components/modals/DeleteBoard';
import { ModalContextType, useModal } from './contexts/ModalContext';
import EditBoard from './components/modals/EditBoard';
import { BoardContextType, useBoard } from './contexts/BoardContext';
import { useState } from 'react';
import { IconShow } from './assets';
import { Transition } from '@headlessui/react';

function App() {
  const { selectedTask, toggleModal } = useModal();
  const { selectedBoard } = useBoard();
  const [showBar, setShowBar] = useState(true);
  const toggleSideNav = () => setShowBar(!showBar);
  return (
    <div className='relative'>
      <div className='relative h-screen bg-dark-3'>
        <AddBoard />
        <AddTask />
        {selectedTask && <ViewTask task={selectedTask} />}
        <DeleteBoard />
        {selectedBoard && <EditBoard board={selectedBoard} />}
        <Header toggleModal={toggleModal}/>
        <div className='flex h-[calc(100vh-6rem)]'>
          <Transition
            show={showBar}
            enter='transition-all transition duration-150'
            enterFrom='opacity-0 w-0'
            enterTo='opacity-100 w-72'
            leave='transition-all duration-150'
            leaveFrom='opacity-100 w-72'
            leaveTo='opacity-0 w-0'
          >
            <SideBar toggleSideNav={toggleSideNav} />
          </Transition>
          {!showBar && (
            <button onClick={toggleSideNav} className='absolute bottom-8 hidden md:inline-block rounded-r-full bg-purple p-5 pr-7 text-white'>
              <IconShow />
            </button>
          )}
          <Kanban />
        </div>
      </div>
    </div>
  );
}

export default App;
