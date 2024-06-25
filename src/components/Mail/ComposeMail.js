import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MailEditor from './MailEditor';
import { setSentMails } from '../../reducers/emailSlice';

export default function ComposeMail() {
  const { email } = useSelector((state) => state.authState.loggedUser);

  const [isValid, setIsValid] = useState(true);
  const toMailRef = useRef();
  const subjectRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let content;

  function handleDoneEditing(mailContent) {
    content = mailContent.content;
  }

  function handleToMailChange() {
    setIsValid(true);
  }

  async function handleSendEmail() {
    const enteredToMail = toMailRef.current.value;
    const enteredSubject = subjectRef.current.value;

    if (!enteredToMail || !enteredSubject) {
      setIsValid(false);
      return;
    }

    if (!enteredToMail.includes('@')) {
      setIsValid(false);
      return;
    }

    if (!content) {
      toast.warning('Did you forget to write the content of mail?');
      return;
    }

    const mailDetails = {
      from: email,
      to: enteredToMail,
      subject: enteredSubject,
      content: content,
    };

    try {
      const response = await fetch(
        `https://fir-frontend-7c7f1-default-rtdb.firebaseio.com/${email.replace('.', '')}/sentMails.json`,
        {
          method: 'POST',
          body: JSON.stringify(mailDetails),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send mail');
      }

      const data = await response.json();
      dispatch(setSentMails({ id: data.name, mail: mailDetails }));

      await fetch(
        `https://fir-frontend-7c7f1-default-rtdb.firebaseio.com/${enteredToMail.replace('.', '')}/receivedMails.json`,
        {
          method: 'POST',
          body: JSON.stringify({ ...mailDetails, read: false }),
        }
      );

      navigate('/mail/sent');
    } catch (error) {
      console.error('Error sending mail:', error);
      toast.error('Failed to send mail. Please try again later.');
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4">
      <div className="p-1 bg-blue-600 text-white flex items-center justify-between">
        <span>New Message</span>
        <button className="text-white" onClick={() => navigate(-1)}>
          ✕
        </button>
      </div>
      <div className="p-4 border rounded-b">
        <div className="flex items-center mb-2">
          <label className="text-sm font-semibold text-gray-600" htmlFor="from">
            From:
          </label>
          <input
            className="px-2 flex-1 focus:outline-none ml-2"
            type="text"
            id="from"
            defaultValue={email}
            readOnly
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="text-sm font-semibold text-gray-600" htmlFor="email">
            To:
          </label>
          <input
            className={`px-2 flex-1 focus:outline-none ml-2 ${
              !isValid ? 'bg-red-200' : ''
            }`}
            type="email"
            id="email"
            onChange={handleToMailChange}
            ref={toMailRef}
          />
          <div className="text-sm text-gray-600 ml-2">
            <span className="mr-1">Cc</span>
            <span>Bcc</span>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <label className="text-sm font-semibold text-gray-600" htmlFor="subject">
            Subject:
          </label>
          <input
            className={`px-2 flex-1 focus:outline-none ml-2 ${
              !isValid ? 'bg-red-200' : ''
            }`}
            type="text"
            id="subject"
            ref={subjectRef}
          />
        </div>
        <MailEditor onDoneEditing={handleDoneEditing} />
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
            onClick={handleSendEmail}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
