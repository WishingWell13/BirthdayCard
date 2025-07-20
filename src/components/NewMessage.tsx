"use client";
import MessageForm from './MessageForm';

interface NewMessageProps {
  cardId: string;
  authorName: string;
  recipientName: string;
  saveMessage?: (formData: FormData) => Promise<void>;
  onBackToCard?: () => void;
}

export default function NewMessage({ cardId, authorName, recipientName, saveMessage, onBackToCard }: NewMessageProps) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-xl font-semibold mb-2 bg-pink-900 text-white px-6 py-4 rounded shadow">
        Leave a message for {recipientName}!
      </h2>
      <MessageForm
        cardId={cardId}
        authorName={authorName}
        saveMessage={saveMessage}
        onBackToCard={onBackToCard}
      />
    </div>
  );
}
