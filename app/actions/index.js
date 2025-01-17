'use server';

import { signIn, signOut } from '@/auth';

export const doSignOut = async () => {
  await signOut();
};

export const doSignIn = async (
  provider,
  callbackUrl = 'http://localhost:3000',
) => {
  await signIn(provider, { callbackUrl });
};

export const loginAction = async (formData) => {
  try {
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    return res;
  } catch (error) {
    throw error;
  }
};
