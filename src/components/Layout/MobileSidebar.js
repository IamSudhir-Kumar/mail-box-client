import { Link, NavLink } from 'react-router-dom';

import { XmarkIcon } from '../../assets/Icons';
import { navLinkClass } from './Sidebar';

export default function MobileSidebar(props) {
  function hideSideBar() {
    document.getElementById('hidden').classList.toggle('hidden');
  }

  return (
    <div
      className="hidden sm:hidden drop-shadow-lg w-64 h-full px-6 py-4 bg-gradient-to-r from-blue-500 to-teal-400 fixed z-50 animate-slideIn"
      id="hidden"
    >
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl text-white">Rmail</h1>
        <button onClick={hideSideBar}>
          <XmarkIcon className="text-white" />
        </button>
      </div>
      <div className="py-10">
        <Link
          className="block border-2 border-white rounded px-4 py-2 text-lg font-semibold text-white duration-300 hover:bg-white hover:text-blue-500 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          to="compose"
          onClick={hideSideBar}
        >
          Compose
        </Link>

        <ul className="mt-4">
          <li className="my-2">
            <NavLink className={navLinkClass} to="inbox" onClick={hideSideBar}>
              <span className="text-white">Inbox</span>
              {props.unreadMails > 0 && (
                <span className="ml-2 font-bold text-yellow-300">
                  +{props.unreadMails}
                </span>
              )}
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink className={navLinkClass} to="sent" onClick={hideSideBar}>
              <span className="text-white">Sent</span>
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink className={navLinkClass} to="stared" onClick={hideSideBar}>
              <span className="text-white">Stared</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
