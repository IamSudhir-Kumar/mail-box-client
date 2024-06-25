import { Link } from 'react-router-dom';
import AuthCard from '../UI/AuthCard';
import mailIcon from '../../assets/mail-icon.png';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <AuthCard className="bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
      <div className="text-center">
        <img className="w-12 mx-auto mb-6 animate-spin-slow" src={mailIcon} alt="mail icon" />
        <h1 className="font-extrabold text-4xl text-white mb-2">Sign in</h1>
        <h3 className="text-lg text-black">to continue to Rmail</h3>
      </div>

      <div className="mt-6 sm:w-80 mx-auto">
        <LoginForm />

        <div className="text-center text-sm mt-6">
          <p className="inline-block text-black">Don't have an account?</p>{' '}
          <Link
            className="font-semibold text-yellow-300 hover:text-yellow-400 transition duration-300"
            to="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
