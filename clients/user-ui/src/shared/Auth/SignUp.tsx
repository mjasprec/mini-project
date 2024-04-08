'use client';
import styles from '@/utils/styles';
import React, { Dispatch, SetStateAction } from 'react';
import { z } from 'zod';

const signUpFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  username: z.string().min(6, 'Username must be at least 6 characters'),
  password: z.string().min(6, 'Username must be at least 6 characters'),
});

type SignUpPropType = {
  setActiveState: Dispatch<SetStateAction<string>>;
};

function SignUp({ setActiveState }: SignUpPropType) {
  return (
    <div>
      <h1 className={`${styles.title}`}>Sign Up</h1>
      <form>
        <h5 className='text-center pt-4 font-Poppins text-[14px] text-white'>
          Already have an account?
          <span
            className={`${styles.label}  text-[#2190ff] cursor-pointer ml-1`}
            onClick={() => setActiveState('sign-in')}
          >
            Sign In
          </span>
        </h5>
      </form>
    </div>
  );
}

export default SignUp;
