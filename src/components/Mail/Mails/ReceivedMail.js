import { useSelector } from 'react-redux';
import EmptyTab from '../../UI/EmptyTab';
import MailList from './MailList';

export default function ReceivedMail() {
  const receivedMails = useSelector((state) => state.emailState.receivedMails);

  let content = <EmptyTab tab="Inbox" />;
  if (receivedMails.length > 0) {
    content = (
      <ul className="divide-y divide-gray-200">
        {receivedMails.map((m) => (
          <MailList key={m.id} id={m.id} mail={m.mail} label="From:" />
        ))}
      </ul>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4">
      {content}
    </div>
  );
}
