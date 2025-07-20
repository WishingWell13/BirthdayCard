"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Message } from "@/types";

const COLORS = [
  "bg-sky-400",
  "bg-violet-400",
  "bg-fuchsia-400",
  "bg-teal-400",
  "bg-orange-400",
  "bg-emerald-400",
  "bg-pink-400",
  "bg-yellow-300",
];


// Deterministic seeded random based on string
function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return Math.abs(h) / 2147483647;
}

function seededInt(seed: string, min: number, max: number) {
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}

function getRandomWords(text: string, count: number) {
  return text.split(" ").slice(0, count).join(" ");
}

type BubbleDisplayProps = {
  messages: Message[];
};

const BubbleDisplay: React.FC<BubbleDisplayProps> = ({ messages }) => {
  const [selected, setSelected] = useState<Message | null>(null);
  // Generate deterministic bubble properties per message
  const bubbleProps = React.useMemo(() => {
    return messages.map((msg) => {
      const seed = msg.id;
      return {
        size: seededInt(seed + 'size', 32, 48),
        color: COLORS[seededInt(seed + 'color', 0, COLORS.length - 1)],
        left: seededInt(seed + 'left', 0, 80),
        top: seededInt(seed + 'top', 0, 80),
        duration: 10 + seededRandom(seed + 'duration') * 8,
      };
    });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-sky-100 to-fuchsia-100">
        <span className="text-xl font-semibold text-gray-700">
          No messages yet. Be the first to leave one!
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {messages.map((msg, i) => {
        const { size, color, left, top, duration } = bubbleProps[i];
        return (
          <motion.div
            key={msg.id}
            className={`absolute flex flex-col items-center justify-center rounded-full shadow-lg cursor-pointer ${color} text-white`}
            style={{
              width: `${size * 4}px`,
              height: `${size * 4}px`,
              left: `${left}%`,
              top: `${top}%`,
              zIndex: 10,
            }}
            animate={{
              y: ["-3%", "3%", "-3%"],
              x: ["-2%", "2%", "-2%"],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            onClick={() => setSelected(msg)}
          >
            <span className="font-bold text-lg text-center px-2">{msg.authorName}</span>
            <span className="text-sm text-center px-2 mt-1">
              {getRandomWords(msg.messageText, 5)}...
            </span>
          </motion.div>
        );
      })}

      {/* Modal Overlay */}
      {selected && (
        <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center bg-black/60">
          <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center flex flex-col items-center justify-center">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-pink-900 mb-4">{selected.authorName}</h2>
            <p className="text-lg text-gray-800 whitespace-pre-wrap">{selected.messageText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleDisplay;
