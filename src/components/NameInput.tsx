"use client";

import Link from "next/link";



export default function NameInput({ visitorName, setVisitorName, onSubmit, error, cardId, isSubmitting }: {
  visitorName: string;
  setVisitorName: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
  cardId: string;
  isSubmitting?: boolean;
}) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <label className="font-medium text-black">Your Name</label>
      <input
        type="text"
        required
        value={visitorName}
        onChange={e => setVisitorName(e.target.value)}
        className="border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black bg-white placeholder-black/70"
        placeholder="e.g. John Smith"
      />
      {error && <div className="text-red-900 text-sm font-semibold">{error}</div>}
      <button
        type="submit"
        className="mt-2 bg-blue-900 text-white font-semibold py-2 rounded hover:bg-blue-950 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Continue'}
      </button>
      {/* Always show Go to Card link for direct navigation */}
      {cardId && (
        <Link
          href={`/card/${cardId}`}
          className="mt-2 text-blue-900 underline font-semibold hover:text-blue-950 transition"
          style={{ alignSelf: 'center' }}
        >
          Go to Card
        </Link>
      )}
    </form>
  );
}
