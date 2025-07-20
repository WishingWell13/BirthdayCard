"use client";
import Link from "next/link";
import React from "react";

export default function LinkSharePage({ params }: { params: Promise<{ cardId: string }> }) {

  const [cardId, setCardId] = React.useState<string>("");
  const [cardUrl, setCardUrl] = React.useState<string>("");
  React.useEffect(() => {
    params.then(({ cardId }) => {
      setCardId(cardId);
      setCardUrl(window.location.origin + `/${cardId}`);
    });
  }, [params]);

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
          <div className="mb-2">
            <span className="font-bold text-black">Link to Share with Guests:</span>
            <span className="block font-mono text-blue-900 break-all">{window.location.origin + `/${cardId}`}</span>
            <button
              onClick={handleCopy}
              className="mt-2 bg-blue-900 text-white font-semibold py-2 px-4 rounded hover:bg-blue-950 transition"
            >
              Copy Guest Link
            </button>
          </div>
          <div className="mt-6">
            <span className="font-bold text-black">Direct Link to View the Card:</span>
            <span className="block font-mono text-pink-900 break-all">{window.location.origin + `/card/${cardId}`}</span>
            <Link
              href={`/card/${cardId}`}
              className="mt-2 inline-block bg-pink-900 text-white font-semibold py-2 px-4 rounded hover:bg-pink-950 transition"
            >
              View Card
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
