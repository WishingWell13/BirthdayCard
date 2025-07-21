"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';


interface MessageFormProps {
  cardId: string;
  authorName: string;
  saveMessage: (formData: FormData) => Promise<void>;
  onBackToCard?: () => void;
}


export default function MessageForm({ cardId, authorName, saveMessage, onBackToCard }: MessageFormProps) {
  const [showThankYou, setShowThankYou] = useState(false);
  const router = useRouter();

  // Handler to show thank you after submit
  async function handleFormAction(formData: FormData) {
    await saveMessage(formData);
    setShowThankYou(true);
    router.refresh();
  }

  if (showThankYou) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="text-green-600 font-semibold">Thank you for your message!</div>
        {onBackToCard && (
          <button
            type="button"
            onClick={onBackToCard}
            className="mt-2 bg-blue-900 text-white font-semibold py-2 px-4 rounded hover:bg-blue-950 transition"
          >
            Back to Card
          </button>
        )}
      </div>
    );
  }

  return (
    <form action={handleFormAction} className="flex flex-col gap-4">
      <input type="hidden" name="cardId" value={cardId} />
      <input type="hidden" name="authorName" value={authorName} />
      <label className="font-bold text-black bg-yellow-300 px-2 py-1 rounded">Your Message</label>
      <textarea
        required
        name="messageText"
        className="border-2 border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black bg-white placeholder-black/70"
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
