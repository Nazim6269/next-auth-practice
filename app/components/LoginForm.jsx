'use client';

import { useRouter } from 'next/navigation';
import { loginAction } from '../actions';
import { useState } from 'react';

const LoginForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await loginAction(formData);

      if (!!res.error) {
        setError(res.error.message);
      } else {
        router.push('/test');
      }
    } catch (error) {
      setError('Provide valid credentials');
    }
  };
  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button type="submit" className="btn-primary w-full mt-4">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
