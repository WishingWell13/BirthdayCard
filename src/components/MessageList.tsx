import { useEffect, useState } from 'react';
import { kv } from '@vercel/kv';
import { Message } from '../../types';

interface MessageListProps {
  cardId: string;
}

export default function MessageList({ cardId }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const rawMessages = await kv.lrange(`messages:${cardId}`, 0, -1);
      const parsed = rawMessages.map((msg: string) => JSON.parse(msg));
      setMessages(parsed);
    }
    fetchMessages();
  }, [cardId]);

  if (messages.length === 0) {
    return <div className="text-gray-500">No messages yet. Be the first to leave one!</div>;
  }

  return (
    <ul className="flex flex-col gap-4 w-full">
      {messages.map(msg => (
        <li key={msg.id} className="bg-gray-50 border rounded p-4">
          <div className="font-semibold text-blue-700">{msg.authorName}</div>
          <div className="mt-2 text-gray-800">{msg.messageText}</div>
        </li>
      ))}
    </ul>
  );
}
