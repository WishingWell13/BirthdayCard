import { useState } from 'react';
import { nanoid } from 'nanoid';
import { kv } from '@vercel/kv';
import { Message } from '../../types';

interface MessageFormProps {
  cardId: string;
  authorName: string;
}

export default function MessageForm({ cardId, authorName }: MessageFormProps) {
  const [messageText, setMessageText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = nanoid();
    const message: Message = { id, cardId, authorName, messageText };
    await kv.rpush(`messages:${cardId}`, JSON.stringify(message));
    setSubmitted(true);
  }

  if (submitted) {
    return <div className="text-green-600 font-semibold">Thank you for your message!</div>;
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="font-medium">Your Message</label>
      <textarea
        required
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        rows={4}
        placeholder="Write something nice..."
      />
      <button
        type="submit"
        className="mt-2 bg-pink-500 text-white font-semibold py-2 rounded hover:bg-pink-600 transition"
      >
        Send Message
      </button>
    </form>
  );
}
