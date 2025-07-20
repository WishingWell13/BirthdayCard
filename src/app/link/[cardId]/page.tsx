"use client";
import Link from "next/link";
import React from "react";

export default function LinkSharePage({ params }: { params: Promise<{ cardId: string }> }) {
  const { cardId } = React.use(params);
  const cardUrl = typeof window !== "undefined"
    ? window.location.origin + `/${cardId}`
    : `https://your-deployed-app.vercel.app/${cardId}`;

  function handleCopy() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(cardUrl);
      alert("Link copied to clipboard!");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-300 p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4 text-black">Your birthday card link is ready to share!</h2>
        <div className="mb-4">
          <span className="font-mono text-blue-900 break-all">{cardUrl}</span>
        </div>
        <button
          onClick={handleCopy}
          className="mb-4 bg-blue-900 text-white font-semibold py-2 px-4 rounded hover:bg-blue-950 transition"
        >
          Copy Link
        </button>
        <Link
          href={`/${cardId}`}
          className="inline-block bg-pink-900 text-white font-semibold py-2 px-4 rounded hover:bg-pink-950 transition"
        >
          Visit Your Card
        </Link>
      </div>
    </main>
  );
}
