import { Menu, Transition } from '@headlessui/react';
import { IconEllipsis, IconPlus, logo, logoMobile } from '../assets';
import { Fragment } from 'react';
import { ModalStatus } from '../contexts/ModalContext';
import NavDropdown from './NavDropdown';
interface Props {
  toggleModal: (name: keyof ModalStatus, value: boolean) => void;
}

export default function Header ({ toggleModal }: Props) {

  return (
    <header className='flex h-20 md:h-24 md:max-h-24 w-screen border-b border-dark-1 bg-dark-2'>
      <div className='flex h-full items-center px-5 md:pt-0 md:pl-8 md:min-w-[288px] md:border-r md:border-dark-1'>
        <picture className='md:h-7 md:w-40'>
          <source srcSet={logoMobile} media='(max-width: 768px)' />
          <img src={logo} />
        </picture>
      </div>
      <div className='flex w-full items-center justify-between md:p-8 text-white'>
        <NavDropdown />
        <div className='flex'>
          <button onClick={() => toggleModal('addTask', true)} type='button' className='btn bg-purple'>
            <IconPlus />
            <span className='ml-2 hidden md:inline-block'>Add new Task</span>
          </button>

          <Menu as='div' className='relative'>
            <Menu.Button className='ml-3 h-full rounded-lg p-2 hover:bg-dark-3'>
              <IconEllipsis />
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
              <Menu.Items className='absolute right-0 mt-2 w-48 origin-bottom-right rounded-lg bg-dark-3 pl-4 shadow-lg'>
                <Menu.Item>
                  <button
                    className='group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-500'
                    onClick={() => toggleModal('deleteBoard', true)}
                  >
                    Delete Board
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
};


