import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../reducers/authSlice';
import { toggleSpinner } from '../../reducers/uiSlice';

import Spinner from '../UI/Spinner';

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const spinner = useSelector((state) => state.uiState.spinner);
  const dispatch = useDispatch();

  async function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      toast.error('Please enter the required details');
      return;
    }

    dispatch(toggleSpinner(true));
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3XRWmzZAAAScrnZoRbSMmwClz7JjSUH4',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch(onLogin(data));
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(toggleSpinner(false));
  }

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
      <div className="mb-6">
        <label
          className="block font-semibold text-sm text-red-800 mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="ring-2 ring-red-300 w-full py-2 px-3 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 autofill:bg-red-100"
          type="email"
          id="email"
          ref={emailRef}
        />
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <label
            className="block font-semibold text-sm text-red-800 mb-2 flex-grow"
            htmlFor="password"
          >
            Password
          </label>
          <Link
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        <input
          className="ring-2 ring-red-300 w-full py-2 px-3 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 autofill:bg-red-100"
          type="password"
          id="password"
          ref={passwordRef}
        />
      </div>
      <div className="mb-6">
        <button
          className="rounded-md py-2 w-full text-sm text-center font-semibold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300"
          type="submit"
        >
          {spinner ? <Spinner /> : 'Login'}
        </button>
      </div>
    </form>
  );
}
