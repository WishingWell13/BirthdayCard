import { kv } from '@vercel/kv';
import { Card, Message } from '../../../types';
import { Suspense } from 'react';
import NameInput from '../../components/NameInput';
import MessageForm from '../../components/MessageForm';
import MessageList from '../../components/MessageList';

interface CardPageProps {
  params: { cardId: string };
}

export default async function CardPage({ params }: CardPageProps) {
  const cardId = params.cardId;
  const card: Card | null = await kv.get(`card:${cardId}`);

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
