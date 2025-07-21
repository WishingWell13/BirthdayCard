"use client";

interface MessageFormClientProps {
  onBackToCard?: () => void;
}

import { useState } from 'react';

export default function MessageFormClient({ onBackToCard }: MessageFormClientProps) {
  const [showThankYou, setShowThankYou] = useState(false);

  // Listen for form submission
  // In a real app, you might use a custom event or ref to detect submission
  // For now, show thank you after submit button is clicked

  return showThankYou ? (
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
  ) : null;
}
