import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead } from '../../../reducers/emailSlice';

export default function MailList(props) {
  const { id, mail, label } = props;
  const { email } = useSelector((state) => state.authState.loggedUser);
  const dispatch = useDispatch();

  async function handleMailClick() {
    if (mail.read === false) {
      const response = await fetch(
        `https://fir-frontend-7c7f1-default-rtdb.firebaseio.com/${email.replace(
          '.',
          ''
        )}/receivedMails/${props.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify({ ...mail, read: true }),
        }
      );
      if (response.ok) {
        dispatch(markAsRead(id));
      }
    }
  }

  return (
    <Link
      className={`block px-4 py-3 border-b flex justify-between items-center ${
        mail.read === false ? 'font-semibold hover:bg-blue-50' : 'hover:bg-gray-50'
      }`}
      to={`${id}`}
      onClick={handleMailClick}
    >
      <div className="flex items-center gap-2 flex-1">
        {mail.read === false && (
          <div className="w-2.5 h-2.5 rounded-full bg-blue-700"></div>
        )}
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <span className="text-sm text-gray-500">{label}</span>{' '}
          <span className="text-sm truncate">{label === 'To:' ? mail.to : mail.from}</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden whitespace-nowrap text-sm truncate">
        {mail.subject}
      </div>
    </Link>
  );
}
