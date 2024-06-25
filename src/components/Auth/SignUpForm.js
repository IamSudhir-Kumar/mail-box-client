import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { toggleSpinner } from '../../reducers/uiSlice';

import Spinner from '../UI/Spinner';

export default function SignUpForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const spinner = useSelector((state) => state.uiState.spinner);
  const dispatch = useDispatch();

  async function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!email || !password || !confirmPassword) {
      toast.error('Please enter the required details');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password did not match');
      return;
    }

    dispatch(toggleSpinner(true));
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3XRWmzZAAAScrnZoRbSMmwClz7JjSUH4',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (response.ok) {
        toast.success('Your account is created successfully. Login here');
        navigate('/login');
      } else {
        const data = await response.json();
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
          className="block font-semibold text-sm text-blue-800 mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="ring-2 ring-blue-300 w-full py-2 px-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 autofill:bg-blue-100"
          type="email"
          id="email"
          ref={emailRef}
        />
      </div>
      <div className="mb-6">
        <label
          className="block font-semibold text-sm text-blue-800 mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="ring-2 ring-blue-300 w-full py-2 px-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 autofill:bg-blue-100"
          type="password"
          id="password"
          ref={passwordRef}
        />
      </div>
      <div className="mb-6">
        <label
          className="block font-semibold text-sm text-blue-800 mb-2"
          htmlFor="confirm-password"
        >
          Confirm Password
        </label>
        <input
          className="ring-2 ring-blue-300 w-full py-2 px-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 autofill:bg-blue-100"
          type="password"
          id="confirm-password"
          ref={confirmPasswordRef}
        />
      </div>
      <div className="mb-6">
        <button
          className="rounded-md py-2 w-full text-sm text-center font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          type="submit"
        >
          {spinner ? <Spinner /> : 'Sign up'}
        </button>
      </div>
    </form>
  );
}
