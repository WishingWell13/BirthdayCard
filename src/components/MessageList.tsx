"use client";

import type { Message } from '../../types';
import { useState } from 'react';
import { deleteMessages } from '../actions/deleteMessage';

interface MessageListProps {
  cardId: string;
  recipientName: string;
  messages: Message[];
  isRecipient?: boolean;
  onMessagesDeleted?: (messages: Message[]) => void;
}

export default function MessageList({ cardId, recipientName, messages, isRecipient, onMessagesDeleted }: MessageListProps) {
  const [selected, setSelected] = useState<Message[]>([]);
  const [deleting, setDeleting] = useState(false);

  if (!messages || messages.length === 0) {
    return <div className="text-gray-500">No messages yet. Be the first to leave one!</div>;
  }

  function toggleSelected(msg: Message) {
    setSelected(current =>
      current.some(m => m.id === msg.id)
        ? current.filter(m => m.id !== msg.id)
        : [...current, msg]
    );
  }

  async function handleBatchDelete() {
    setDeleting(true);
    const result = await deleteMessages(cardId, recipientName, selected);
    setDeleting(false);
    if (result.success && onMessagesDeleted) {
      onMessagesDeleted(selected);
      setSelected([]);
    } else if (!result.success) {
      alert(result.error || 'Failed to delete messages');
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {isRecipient && selected.length > 0 && (
        <button
          className="self-end bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900 transition font-semibold mb-2"
          onClick={handleBatchDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : `Delete Selected (${selected.length})`}
        </button>
      )}
      <ul className="flex flex-col gap-4 w-full">
        {messages.map(msg => (
          <li key={msg.id} className="bg-gray-50 border rounded p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {isRecipient && (
                <input
                  type="checkbox"
                  checked={selected.some(m => m.id === msg.id)}
                  onChange={() => toggleSelected(msg)}
                  className="accent-red-700 w-5 h-5"
                />
              )}
              <div className="font-semibold text-blue-700">{msg.authorName}</div>
            </div>
            <div className="mt-2 text-gray-800">{msg.messageText}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
