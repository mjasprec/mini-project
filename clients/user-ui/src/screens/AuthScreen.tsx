'use client';
import Otp from '@/shared/Auth/Otp';
import SignIn from '@/shared/Auth/SignIn';
import SignUp from '@/shared/Auth/SignUp';
import { useState } from 'react';

function AuthScreen() {
  const [activeState, setActiveState] = useState('sign-in');
  return (
    <div className='w-full h-screen fixed top-0 left-0 z-50 flex items-center justify-center bg-[#0000003a]'>
      <div className='w-[38%] h-auto bg-slate-900 rounded shadow-sm p-5'>
        {activeState === 'sign-in' ? (
          <SignIn setActiveState={setActiveState} />
        ) : null}

        {activeState === 'sign-up' ? (
          <SignUp setActiveState={setActiveState} />
        ) : null}

        {activeState === 'verification' ? (
          <Otp setActiveState={setActiveState} />
        ) : null}
      </div>
    </div>
  );
}

export default AuthScreen;
