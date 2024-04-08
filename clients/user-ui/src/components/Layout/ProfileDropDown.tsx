'use client';
import AuthScreen from '@/screens/AuthScreen';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';

function ProfileDropDown() {
  const [signedId, setSignedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='flex items-center gap-4'>
      {signedId ? (
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              as='button'
              className='transition-transform'
              src={
                'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'
              }
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Profile Actions'
            variant='flat'
          >
            <DropdownItem
              key='Profile'
              className='h-14 gap-2'
            >
              <p className='font-semibold text-gray-500 text-[12px]'>
                Signed in as
              </p>
              <p className='font-semibold'>MJ Asprec</p>
            </DropdownItem>
            <DropdownItem key='Profile'>
              <p className='font-semibold'>Profile</p>
            </DropdownItem>
            <DropdownItem key='Wallet'>
              <p className='font-semibold'>Wallet</p>
            </DropdownItem>
            <DropdownItem key='NFT'>
              <p className='font-semibold'>NFT</p>
            </DropdownItem>
            <DropdownItem
              key='logout'
              color='danger'
            >
              <p className='font-semibold'>Logout</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <CgProfile
          className='text-2xl cursor-pointer'
          onClick={() => setIsModalOpen((prev) => !prev)}
        />
      )}

      {isModalOpen ? <AuthScreen /> : null}
    </div>
  );
}

export default ProfileDropDown;
