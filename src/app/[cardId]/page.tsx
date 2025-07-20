import { kv } from '@vercel/kv';
import { Card, Message } from '../../../types';
import { Suspense } from 'react';
import NameInput from '../../components/NameInput';
import MessageForm from '../../components/MessageForm';

interface CardPageProps {
  params: { cardId: string };
}

export default async function CardPage({ params }: CardPageProps) {
  const cardId = params.cardId;
  const card: Card | null = await kv.get(`card:${cardId}`);
  // Try both lrange and zrange for compatibility
  let rawMessages = await kv.zrange(`messages:${cardId}`, 0, -1);
  if (!rawMessages || rawMessages.length === 0) {
    rawMessages = await kv.lrange(`messages:${cardId}`, 0, -1);
  }
  const messages: Message[] = rawMessages
    ? rawMessages.map((msg: any) => {
        if (typeof msg === 'string') {
          try {
            return JSON.parse(msg);
          } catch {
            return null;
          }
        }
        if (typeof msg === 'object' && msg !== null) {
          return msg;
        }
        return null;
      }).filter(Boolean)
    : [];

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

  // NameInput will handle visitor name and conditional rendering
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <Suspense fallback={<div>Loading...</div>}>
          <NameInput card={card} cardId={cardId} />
        </Suspense>
      </div>
    </main>
  );
}
