"use client";
import { useState, useEffect } from 'react';
import NameInput from './NameInput';
import EditMessages from './EditMessages';
import NewMessage from './NewMessage';
import { getUserMessages } from '../actions/getUserMessages';
import type { Card, Message } from '@/types';

interface CardClientProps {
  card: Card | null;
  cardId: string;
}

export default function CardClient({ card, cardId }: CardClientProps) {
  const [visitorName, setVisitorName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (submitted && visitorName.trim()) {
      setLoading(true);
      getUserMessages(cardId, visitorName)
        .then(setMessages)
        .finally(() => setLoading(false));
    }
  }, [submitted, visitorName, cardId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!visitorName.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  if (!card) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Card Not Found</h2>
          <p className="text-gray-600">Sorry, this card does not exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {!submitted ? (
          <NameInput
            visitorName={visitorName}
            setVisitorName={setVisitorName}
            onSubmit={handleSubmit}
            error={error}
            cardId={cardId}
          />
        ) : loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : messages.length > 0 ? (
          <EditMessages initialMessages={messages} cardId={cardId} visitorName={visitorName} />
        ) : (
          <NewMessage
            cardId={cardId}
            authorName={visitorName}
            recipientName={card.recipientName}
            onBackToCard={() => setSubmitted(false)}
          />
        )}
      </div>
    </main>
  );
}
