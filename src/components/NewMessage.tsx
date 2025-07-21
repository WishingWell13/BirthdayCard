"use client";

import NewMessageServer from './NewMessageServer';
import { useSearchParams } from 'next/navigation';


interface NewMessageProps {
  cardId: string;
  authorName: string;
  recipientName: string;
  onBackToCard?: () => void;
  submitted?: boolean;
}


export default function NewMessage({ cardId, authorName, recipientName, onBackToCard, submitted }: NewMessageProps) {
  // If submitted is not provided, fall back to search param (for backward compatibility)
  const searchParams = useSearchParams();
  const isSubmitted = typeof submitted === 'boolean' ? submitted : searchParams.get('submitted') === '1';
  return (
    <NewMessageServer
      cardId={cardId}
      authorName={authorName}
      recipientName={recipientName}
      onBackToCard={onBackToCard}
      submitted={isSubmitted}
    />
  );
}

