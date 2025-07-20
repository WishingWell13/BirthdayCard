"use client";
import { useState } from 'react';
import { useEffect } from 'react';
import MessageForm from './MessageForm';
import { saveMessage } from '../actions/saveMessage';
import MessageList from './MessageList';
import { getMessages } from '../actions/getMessages';
import { Card } from '../../types';
import type { Message } from '../../types';

interface NameInputProps {
  card: Card;
  cardId: string;
}

export default function NameInput({ card, cardId }: NameInputProps) {
  const [visitorName, setVisitorName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Only fetch messages if visitor is the recipient and has submitted their name
    if (submitted && visitorName.trim().toLowerCase() === card.recipientName.trim().toLowerCase()) {
      getMessages(cardId).then(setMessages);
    }
  }, [submitted, visitorName, card.recipientName, cardId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!visitorName.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  // Hydration-safe conditional rendering
  if (!submitted) {
    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="font-medium text-black">Your Name</label>
        <input
          type="text"
          required
          value={visitorName}
          onChange={e => setVisitorName(e.target.value)}
          className="border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black bg-white placeholder-black/70"
          placeholder="e.g. John Smith"
        />
        {error && <div className="text-red-900 text-sm font-semibold">{error}</div>}
        <button
          type="submit"
          className="mt-2 bg-blue-900 text-white font-semibold py-2 rounded hover:bg-blue-950 transition"
        >
          Continue
        </button>
      </form>
    );
  }

  // Only client-side state controls rendering after name entry
  const isRecipient = visitorName.trim().toLowerCase() === card.recipientName.trim().toLowerCase();
  if (isRecipient) {
    return (
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold mb-2 bg-blue-900 text-white px-6 py-4 rounded shadow">
          Happy Birthday, {card.recipientName}!
        </h2>
        <MessageList messages={messages} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-xl font-semibold mb-2 bg-pink-900 text-white px-6 py-4 rounded shadow">
        Leave a message for {card.recipientName}!
      </h2>
      <MessageForm
        cardId={cardId}
        authorName={visitorName}
        saveMessage={saveMessage}
        onBackToCard={() => setSubmitted(false)}
      />
    </div>
  );
}
