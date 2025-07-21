"use client";

interface BackToCardButtonProps {
  onBackToCard?: () => void;
}

export default function BackToCardButton({ onBackToCard }: BackToCardButtonProps) {
  if (!onBackToCard) return null;
  return (
    <button
      type="button"
      onClick={onBackToCard}
      className="mt-2 bg-blue-900 text-white font-semibold py-2 px-4 rounded hover:bg-blue-950 transition"
    >
      Back to Card
    </button>
  );
}
