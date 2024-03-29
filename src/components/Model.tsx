import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useModal, ModalContextType, ModalStatus } from '../contexts/ModalContext';

const Modal = ({ modalName, children }: { modalName: keyof ModalStatus; children: JSX.Element }) => {
  const { modalStatus, toggleModal } = useModal();

  return (
    <Transition appear show={modalStatus[modalName]} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => toggleModal(modalName, false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-xl transform rounded-md bg-dark-2 p-8 text-left align-middle text-white shadow-xl transition-all'>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
