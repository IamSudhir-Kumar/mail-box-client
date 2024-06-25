import { Link, NavLink } from 'react-router-dom';

export const navLinkClass = ({ isActive }) => {
  return `block px-4 py-2 rounded-r-2xl border-l-4 transition-all duration-300
  ${
    isActive
      ? 'bg-blue-300 font-semibold border-l-blue-700 text-blue-900'
      : 'hover:bg-blue-200 hover:border-l-blue-400 text-gray-700'
  }
`;
};

export default function Sidebar(props) {
  return (
    <div className="hidden sm:block drop-shadow-lg w-64 h-full px-6 py-8 bg-gradient-to-r from-blue-50 to-teal-50 fixed top-12">
      <Link
        className="block text-center border-2 border-blue-600 rounded px-4 py-2 text-lg font-semibold text-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        to="compose"
      >
        Compose
      </Link>

      <ul className="mt-6 py-2 rounded">
        <li className="my-3">
          <NavLink className={navLinkClass} to="inbox">
            Inbox
            {props.unreadMails > 0 && (
              <span className="ml-3 font-bold text-blue-700">
                +{props.unreadMails}
              </span>
            )}
          </NavLink>
        </li>
        <li className="my-3">
          <NavLink className={navLinkClass} to="sent">
            Sent
          </NavLink>
        </li>
        <li className="my-3">
          <NavLink className={navLinkClass} to="stared">
            Stared
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
