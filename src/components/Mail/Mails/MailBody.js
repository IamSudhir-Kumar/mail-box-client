import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteReceivedMails,
  deleteSentMails,
  markAsUnread,
} from '../../../reducers/emailSlice';
import { BackArrow, DeleteIcon, MarkAsUnread } from '../../../assets/Icons';

export default function MailBody() {
  const { mailId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const sentMails = useSelector((state) => state.emailState.sentMails);
  const receivedMails = useSelector((state) => state.emailState.receivedMails);
  const { email } = useSelector((state) => state.authState.loggedUser);

  if (!sentMails.length && !receivedMails.length) {
    if (location.pathname.includes('inbox')) navigate('/mail/inbox');
    if (location.pathname.includes('sent')) navigate('/mail/sent');
    return null;
  }

  const allMails = [...sentMails, ...receivedMails];
  const selectedMail = allMails.find((m) => m.id === mailId);

  if (!selectedMail) {
    if (location.pathname.includes('inbox')) navigate('/mail/inbox');
    if (location.pathname.includes('sent')) navigate('/mail/sent');
    return null;
  }

  async function handleDeleteMail() {
    let apiUrl = '';
    if (location.pathname.includes('inbox')) {
      apiUrl = `https://fir-frontend-7c7f1-default-rtdb.firebaseio.com/${email.replace(
        '.',
        ''
      )}/receivedMails/${mailId}.json`;
    } else if (location.pathname.includes('sent')) {
      apiUrl = `https://fir-frontend-7c7f1-default-rtdb.firebaseio.com/${email.replace(
        '.',
        ''
      )}/sentMails/${mailId}.json`;
    }

    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

    if (response.ok) {
      if (location.pathname.includes('inbox')) {
        dispatch(deleteReceivedMails(mailId));
        navigate('/mail/inbox');
      } else if (location.pathname.includes('sent')) {
        dispatch(deleteSentMails(mailId));
        navigate('/mail/sent');
      }
    }
  }

  async function handleMarkAsUnread() {
    if (selectedMail.mail.read === true) {
      const response = await fetch(
        `https://fir-frontend-7c7f1-default-rtdb.firebaseio.com/${email.replace(
          '.',
          ''
        )}/receivedMails/${mailId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify({ ...selectedMail.mail, read: false }),
        }
      );
      if (response.ok) {
        dispatch(markAsUnread(mailId));
      }
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4">
      <header className="flex justify-between items-center mb-4">
        <button
          className="p-2 rounded-full hover:bg-gray-100 duration-300"
          onClick={() => navigate(-1)}
        >
          <BackArrow className="w-6" />
        </button>
        <div className="flex items-center gap-2">
          {location.pathname.includes('inbox') && (
            <button
              className="p-2 rounded-full hover:bg-gray-100 duration-300"
              onClick={handleMarkAsUnread}
            >
              <MarkAsUnread className="w-6" />
            </button>
          )}
          <button
            className="p-2 rounded-full hover:bg-gray-100 duration-300"
            onClick={handleDeleteMail}
          >
            <DeleteIcon className="w-6" />
          </button>
        </div>
      </header>
      <section>
        <div className="mb-4">
          <h1 className="text-xl font-semibold">{selectedMail.mail.subject}</h1>
          <p className="text-sm text-gray-500">
            {location.pathname.includes('inbox')
              ? `<${selectedMail.mail.from}>`
              : `<${selectedMail.mail.to}>`}
          </p>
        </div>
        <Editor
          editorClassName="wysiwyg-editor"
          initialContentState={selectedMail.mail.content}
          readOnly
          toolbarHidden
        />
      </section>
    </div>
  );
}
