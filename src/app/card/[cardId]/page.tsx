import MessageList from '../../../components/MessageList';
import { kv } from '@vercel/kv';
import { Card, Message } from '@/types';

export default async function CardViewPage({ params }: { params: Promise<{ cardId: string }> }) {
  const { cardId } = await params;
  const card = await kv.get(`card:${cardId}`) as Card | null;
  const rawMessages = await kv.zrange(`messages:${cardId}`, 0, -1);
  const messages = (rawMessages as (string | object)[]).map(m =>
    typeof m === 'string' ? JSON.parse(m) : m
  ) as Message[];

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
        <h1 className="text-3xl font-bold text-pink-900 mb-6 text-center">
          Happy Birthday, {card.recipientName}!
        </h1>
        <MessageList
          cardId={cardId}
          recipientName={card.recipientName}
          messages={messages}
          isRecipient={true}
        />
      </div>
    </main>
  );
}
