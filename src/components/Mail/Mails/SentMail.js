import { useSelector } from 'react-redux';
import EmptyTab from '../../UI/EmptyTab';
import Loader from '../../UI/Loader';
import MailList from './MailList';

export default function SentMail() {
  const sentMails = useSelector((state) => state.emailState.sentMails);
  const spinner = useSelector((state) => state.uiState.spinner);

  let content = <EmptyTab tab="Sent" />;
  if (sentMails.length > 0) {
    content = (
      <ul className="divide-y divide-gray-200">
        {sentMails.map((m) => (
          <MailList key={m.id} id={m.id} mail={m.mail} label="To:" />
        ))}
      </ul>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4">
      {spinner ? (
        <Loader />
      ) : (
        content
      )}
    </div>
  );
}
