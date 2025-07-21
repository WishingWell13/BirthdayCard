"use client";
import React, { useState, useEffect } from "react";
import BubbleDisplay from "../../../components/BubbleDisplay";
import MessageList from "../../../components/MessageList";
import { Message } from "@/types";

interface CardViewClientProps {
  messages: Message[];
  recipientName: string;
  cardId: string;
}

const CardViewClient: React.FC<CardViewClientProps> = ({ messages, recipientName, cardId }) => {
  const [viewMode, setViewMode] = useState<'bubble' | 'list'>('bubble');

  useEffect(() => {
    import('canvas-confetti').then((module) => {
      const confetti = module.default;
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    });
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <button
        className="fixed top-6 right-6 z-50 bg-pink-900 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-pink-950 transition"
        onClick={() => setViewMode(viewMode === 'bubble' ? 'list' : 'bubble')}
      >
        {viewMode === 'bubble' ? 'Show List View' : 'Show Bubble View'}
      </button>
      {viewMode === 'bubble' ? (
        <BubbleDisplay messages={messages} />
      ) : (
        <div className="p-8 pt-20 w-full h-full">
          <h1 className="text-3xl font-bold text-pink-900 mb-6 text-center">
            Happy Birthday, {recipientName}!
          </h1>
          <MessageList messages={messages} cardId={cardId} recipientName={recipientName} isRecipient={true} />
        </div>
      )}
    </div>
  );
};

export default CardViewClient;
