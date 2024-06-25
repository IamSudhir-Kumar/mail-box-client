import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSpinner } from '../../reducers/uiSlice';
import Spinner from '../UI/Spinner';

export default function ForgotPasswordForm() {
  const emailRef = useRef();

  const spinner = useSelector((state) => state.uiState.spinner);
  const dispatch = useDispatch();

  async function handleFormSubmit(event) {
    event.preventDefault();
    dispatch(toggleSpinner(true));

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD3XRWmzZAAAScrnZoRbSMmwClz7JjSUH4',
        {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: emailRef.current.value,
          }),
        }
      );
      if (response.ok) {
        toast.success('Password reset link has been sent to your email');
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
          className="block font-semibold text-sm text-orange-800 mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="ring-2 ring-orange-300 w-full py-2 px-3 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 autofill:bg-orange-100"
          type="email"
          id="email"
          ref={emailRef}
        />
      </div>

      <div className="mb-6">
        <button
          className="rounded-md py-2 w-full text-sm text-center font-semibold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300"
          type="submit"
        >
          {spinner ? <Spinner /> : 'Get reset link'}
        </button>
      </div>
    </form>
  );
}
