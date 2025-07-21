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


const CardViewClient: React.FC<CardViewClientProps> = ({ messages: initialMessages, recipientName, cardId }) => {
  const [viewMode, setViewMode] = useState<'bubble' | 'list'>('bubble');
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Keep messages in sync if initialMessages changes (e.g., on navigation)
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

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

  // Callback for MessageList to update messages after deletion
  const handleMessagesDeleted = (deleted: Message[]) => {
    setMessages((prev) => prev.filter(msg => !deleted.some(d => d.id === msg.id)));
  };

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
          <MessageList
            messages={messages}
            cardId={cardId}
            recipientName={recipientName}
            isRecipient={true}
            onMessagesDeleted={handleMessagesDeleted}
          />
        </div>
      )}
    </div>
  );
};

export default CardViewClient;
