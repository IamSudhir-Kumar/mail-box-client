import { Link } from 'react-router-dom';
import AuthCard from '../UI/AuthCard';
import mailIcon from '../../assets/mail-icon.png';
import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPassword() {
  return (
    <AuthCard className="bg-gradient-to-r from-teal-400 to-indigo-600 p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
      <div className="text-center">
        <img className="w-12 mx-auto mb-6 animate-bounce" src={mailIcon} alt="mail icon" />
        <h1 className="font-extrabold text-4xl text-white mb-2">Reset your Password</h1>
        <h3 className="text-lg text-gray-200">Enter registered email</h3>
      </div>

      <div className="mt-6 sm:w-80 mx-auto">
        <ForgotPasswordForm />

        <div className="text-center text-sm mt-6">
          <p className="inline-block text-gray-200">Know your password?</p>{' '}
          <Link
            className="font-semibold text-yellow-300 hover:text-yellow-400 transition duration-300"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
