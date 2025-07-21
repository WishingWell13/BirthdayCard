"use client";

import { useState } from 'react';
import { updateMessage } from '../actions/updateMessage';
import type { Message } from '@/types';

interface EditMessagesProps {
  messages: Message[];
  cardId: string;
  visitorName: string;
  onMessagesChange: (messages: Message[]) => void;
  onDone: () => void;
}

export default function EditMessages({ messages, cardId, visitorName, onMessagesChange, onDone }: EditMessagesProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-row items-center justify-between w-full mb-2">
        <h2 className="text-2xl font-bold bg-blue-900 text-white px-6 py-4 rounded shadow">
          Welcome back, {visitorName}! Edit your message(s):
        </h2>
      </div>
      <ul className="w-full flex flex-col gap-4">
        {messages.map(msg => (
          <li key={msg.id} className="bg-gray-50 border rounded p-4 flex flex-col gap-2">
            {editingId === msg.id ? (
              <>
                <textarea
                  className="w-full border rounded p-2 text-black"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button
                  className="mt-2 bg-blue-900 text-white font-semibold py-1 px-3 rounded"
                  onClick={async () => {
                    await updateMessage(cardId, msg.id, editText);
                    onMessagesChange(
                      messages.map(m => m.id === msg.id ? { ...m, messageText: editText } : m)
                    );
                    setEditingId(null);
                  }}
                >
                  Save Changes
                </button>
                <button
                  className="mt-2 ml-2 bg-gray-300 text-black font-semibold py-1 px-3 rounded"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="text-gray-800 whitespace-pre-wrap">{msg.messageText}</div>
                <button
                  className="mt-2 bg-pink-900 text-white font-semibold py-1 px-3 rounded"
                  onClick={() => {
                    setEditingId(msg.id);
                    setEditText(msg.messageText);
                  }}
                >
                  Edit
                </button>
                {/* Show Done button under Edit only if not editing any message */}
                {editingId === null && (
                  <button
                    className="mt-2 bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded hover:bg-gray-300 transition"
                    onClick={onDone}
                  >
                    Done
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
