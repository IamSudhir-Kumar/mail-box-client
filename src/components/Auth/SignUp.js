import { Link } from 'react-router-dom';
import AuthCard from '../UI/AuthCard';
import mailIcon from '../../assets/mail-icon.png';
import SignUpForm from './SignUpForm';

export default function SignUp() {
  return (
    <AuthCard className="bg-gradient-to-r from-purple-400 to-pink-500 p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
      <div className="text-center">
        <img className="w-12 mx-auto mb-6 animate-bounce" src={mailIcon} alt="mail icon" />
        <h1 className="font-extrabold text-4xl text-white mb-2">Create a Rmail Account</h1>
        <h3 className="text-lg text-gray-700">Enter email and password</h3>
      </div>

      <div className="mt-6 sm:w-80 mx-auto">
        <SignUpForm />

        <div className="text-center text-sm mt-6">
          <p className="inline-block text-gray-700">Already have an account?</p>{' '}
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
