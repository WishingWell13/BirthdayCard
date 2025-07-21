
"use client";

import React, { useState, useEffect } from 'react';
import type { Message } from '@/types';
import { deleteMessages } from '../actions/deleteMessage';
import { deduplicateMessages } from '@/lib/utils';

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
  const [localMessages, setLocalMessages] = useState<Message[] | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Use localMessages if set, otherwise use messages from props
  const dedupedMessages = React.useMemo(() => {
    return deduplicateMessages(localMessages ?? messages);
  }, [messages, localMessages]);

  // When the canonical messages prop from the parent changes, it becomes the new
  // source of truth. This effect resets the local optimistic state, ensuring
  // this component is in sync with its parent.
  useEffect(() => {
    setLocalMessages(null);
  }, [messages]);

  if (!dedupedMessages || dedupedMessages.length === 0) {
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
    setDeleteError(null);
    // Optimistically remove selected messages from UI
    const prevMessages = localMessages ?? messages;
    const selectedIds = new Set(selected.map(m => m.id));
    const optimisticMessages = prevMessages.filter(msg => !selectedIds.has(msg.id));
    setLocalMessages(optimisticMessages);

    try {
      const result = await deleteMessages(cardId, recipientName, selected);
      setDeleting(false);
      if (result.success && onMessagesDeleted) {
        onMessagesDeleted(selected);
        setSelected([]);
        // Keep localMessages as is until parent updates props
      } else if (!result.success) {
        setLocalMessages(prevMessages); // revert
        setDeleteError(result.error || 'Failed to delete messages');
      }
    } catch {
      setLocalMessages(prevMessages); // revert
      setDeleteError('Failed to delete messages');
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {deleteError && (
        <div className="text-red-600 font-semibold mb-2">{deleteError}</div>
      )}
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
        {dedupedMessages.map(msg => (
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
            <div className="mt-2 text-gray-800 whitespace-pre-wrap">{msg.messageText}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
