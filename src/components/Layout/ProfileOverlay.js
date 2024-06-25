import { useSelector, useDispatch } from 'react-redux';
import { onLogout } from '../../reducers/authSlice';

import { LogoutIcon } from '../../assets/Icons';
import profileIcon from '../../assets/profile-icon.jpg';

export default function ProfileOverlay(props) {
  const { email } = useSelector((state) => state.authState.loggedUser);
  const dispatch = useDispatch();

  return (
    <div id="overlay">
      <div
        className="w-full h-full fixed z-40"
        onClick={() => props.onCloseOverlay()}
      ></div>
      <div className="fixed z-50 top-14 right-6 rounded-xl bg-gradient-to-r from-blue-100 to-teal-100 drop-shadow-xl w-80 h-56 p-5 flex flex-col items-center justify-around">
        <h1 className="text-lg font-semibold text-gray-700">{email}</h1>
        <div className="flex flex-col items-center">
          <div>
            <img className="w-16 rounded-full border-2 border-blue-500" src={profileIcon} alt="Profile" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Your Name</h1>
        </div>
        <div>
          <button
            className="flex items-center gap-2 bg-white rounded-3xl px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => dispatch(onLogout())}
          >
            <LogoutIcon />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
