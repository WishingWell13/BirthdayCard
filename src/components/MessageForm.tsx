"use client";
import { useState } from 'react';
import { Message } from '../../types';


interface MessageFormProps {
  cardId: string;
  authorName: string;
  saveMessage: (formData: FormData) => Promise<void>;
}

export default function MessageForm({ cardId, authorName, saveMessage }: MessageFormProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <div className="text-green-600 font-semibold">Thank you for your message!</div>;
  }

  return (
    <form action={async (formData) => {
      await saveMessage(formData);
      setSubmitted(true);
    }} className="flex flex-col gap-4">
      <input type="hidden" name="cardId" value={cardId} />
      <input type="hidden" name="authorName" value={authorName} />
      <label className="font-medium">Your Message</label>
      <textarea
        required
        name="messageText"
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
