import { useState } from 'react';
import { useSelector } from 'react-redux';

import { MenuBarIcon } from '../../assets/Icons';
import profileIcon from '../../assets/profile-icon.jpg';
import mailIcon from '../../assets/mail-icon.png';
import ProfileOverlay from './ProfileOverlay';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);

  const unreadMails = useSelector((state) => state.emailState.unreadMails);

  return (
    <header className="h-16 shadow-md bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="w-full flex justify-between items-center py-3 px-6 fixed z-30">
        <h1 className="hidden sm:block font-bold text-3xl text-white">
          Mail-Client
        </h1>
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => {
            document.getElementById('hidden').classList.toggle('hidden');
          }}
        >
          <MenuBarIcon className="text-white" />
        </button>
        <div>
          <img className="rounded-full w-10 animate-pulse" src={mailIcon} alt="mail icon" />
        </div>

        <button
          className="w-10 h-10 rounded-full border-2 border-transparent hover:border-white focus:outline-none focus:border-white"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img className="rounded-full" src={profileIcon} alt="Profile" />
        </button>
      </div>
      {showProfile && (
        <ProfileOverlay onCloseOverlay={() => setShowProfile(!showProfile)} />
      )}
      <Sidebar unreadMails={unreadMails} />
      <MobileSidebar unreadMails={unreadMails} />
    </header>
  );
}
