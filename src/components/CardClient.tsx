"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [hasCheckedSubmitted, setHasCheckedSubmitted] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Check for submitted query parameter
  useEffect(() => {
    const submitted = searchParams.get('submitted');
    if (submitted === '1') {
      setShowThankYou(true);
      // Clean up the URL parameter
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('submitted');
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
    setHasCheckedSubmitted(true);
  }, [searchParams, router]);

  // Fetch messages after name submission
  useEffect(() => {
    if (nameSubmitted && visitorName.trim()) {
      setLoading(true);
      getUserMessages(cardId, visitorName)
        .then(fetched => {
          const deduped = Object.values(
            fetched.reduce((acc, msg) => {
              acc[msg.id] = msg;
              return acc;
            }, {} as Record<string, Message>)
          );
          setMessages(deduped);
        })
        .finally(() => setLoading(false));
    }
  }, [nameSubmitted, visitorName, cardId]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setNameSubmitted(true);
  };

  // Prevent UI flash: if ?submitted=1 is present and thank you not yet shown, render nothing
  if (searchParams.get('submitted') === '1' && !showThankYou && !hasCheckedSubmitted) {
    return null;
  }

  if (!card) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 w-full text-center">
        <h2 className="text-xl font-bold mb-2">Card Not Found</h2>
        <p className="text-gray-600">Sorry, this card does not exist.</p>
      </div>
    );
  }

  // Central thank you page after actions
  if (showThankYou) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-white p-8">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Thank you for your message!
        </h2>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          onClick={() => {
            setShowThankYou(false);
            setNameSubmitted(false);
            setVisitorName('');
            setMessages([]);
            // Clear the URL parameter when going back to name input
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('submitted');
            const newUrl = newParams.toString() ? `?${newParams.toString()}` : window.location.pathname;
            router.replace(newUrl, { scroll: false });
          }}
        >
          Back to Card
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full h-full flex flex-col overflow-y-auto">
      {!nameSubmitted ? (
        <NameInput
          visitorName={visitorName}
          setVisitorName={setVisitorName}
          onSubmit={handleNameSubmit}
          error={error}
          cardId={cardId}
        />
      ) : loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : messages.length > 0 ? (
        <EditMessages
          messages={messages}
          cardId={cardId}
          visitorName={visitorName}
          onMessagesChange={setMessages}
          onDone={() => setShowThankYou(true)}
        />
      ) : (
        <NewMessage
          cardId={cardId}
          authorName={visitorName}
          recipientName={card.recipientName}
          onBackToCard={() => setNameSubmitted(false)}
        />
      )}
    </div>
  );
}