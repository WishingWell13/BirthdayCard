import CardClient from '../../components/CardClient';

import { kv } from '@vercel/kv';
import { Card } from '@/types';

export default async function CardPage({ params }: { params: Promise<{ cardId: string }> }) {
  const { cardId } = await await params;
  const card = await kv.get(`card:${cardId}`) as Card | null;

  // The rest of the logic (visitorName, submitted, messages, etc.) must be handled in a client component
  // We'll create a CardClient component to handle client state and pass card as a prop

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-pink-50 p-4 sm:p-8">
      <div className="flex-1 flex items-center justify-center w-full max-w-2xl mx-auto">
        <CardClient card={card} cardId={cardId} />
      </div>
    </main>
  );
}

// CardClient.tsx (to be created in src/components)
// Handles visitorName, submitted, messages, etc. and renders NameInput, EditMessages, NewMessage as before
