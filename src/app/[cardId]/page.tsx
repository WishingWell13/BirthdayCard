import CardClient from '../../components/CardClient';

import { kv } from '@vercel/kv';
import { Card } from '@/types';

export default async function CardPage({ params }: { params: Promise<{ cardId: string }> }) {
  const { cardId } = await params;
  const card = await kv.get(`card:${cardId}`) as Card | null;

  // The rest of the logic (visitorName, submitted, messages, etc.) must be handled in a client component
  // We'll create a CardClient component to handle client state and pass card as a prop

  return (
    <CardClient card={card} cardId={cardId} />
  );
}

// CardClient.tsx (to be created in src/components)
// Handles visitorName, submitted, messages, etc. and renders NameInput, EditMessages, NewMessage as before
