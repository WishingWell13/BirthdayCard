import { useState } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { Card } from '../../types';

interface NameInputProps {
  card: Card;
  cardId: string;
}

export default function NameInput({ card, cardId }: NameInputProps) {
  const [visitorName, setVisitorName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!visitorName.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  if (!submitted) {
    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="font-medium">Your Name</label>
        <input
          type="text"
          required
          value={visitorName}
          onChange={e => setVisitorName(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="e.g. John Smith"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
        >
          Continue
        </button>
      </form>
    );
  }

  // Conditional rendering
  if (visitorName.trim().toLowerCase() === card.recipientName.trim().toLowerCase()) {
    return (
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold mb-2">Happy Birthday, {card.recipientName}!</h2>
        <MessageList cardId={cardId} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-xl font-semibold mb-2">Leave a message for {card.recipientName}!</h2>
      <MessageForm cardId={cardId} authorName={visitorName} />
    </div>
  );
}
