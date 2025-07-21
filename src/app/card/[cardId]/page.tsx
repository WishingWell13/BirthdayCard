import { kv } from '@vercel/kv';
import { Card, Message } from '@/types';
import CardViewClient from './CardViewClient';

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
    <div className={card.theme || 'light'}>
      <CardViewClient
        messages={messages}
        recipientName={card.recipientName}
        cardId={cardId}
      />
    </div>
  );
}
