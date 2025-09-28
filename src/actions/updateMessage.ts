"use server";
import { kv } from '@vercel/kv';
import type { Message } from '@/types';

export async function updateMessage(cardId: string, messageId: string, newMessageText: string): Promise<{ success: boolean; error?: string }> {
  const rawMessages = await kv.zrange(`messages:${cardId}`, 0, -1);
  let match: { message: Message; serialized: string } | null = null;

  for (const entry of rawMessages) {
    let parsed: Message | null = null;

    if (typeof entry === 'string') {
      try {
        parsed = JSON.parse(entry) as Message;
      } catch {
        parsed = null;
      }
      if (parsed && parsed.id === messageId) {
        match = { message: parsed, serialized: entry };
        break;
      }
    } else if (typeof entry === 'object' && entry !== null) {
      parsed = entry as Message;
      if (parsed.id === messageId) {
        match = { message: parsed, serialized: JSON.stringify(entry) };
        break;
      }
    }
  }

  if (!match) return { success: false, error: 'Message not found' };

  const updatedMessage: Message = { ...match.message, messageText: newMessageText };

  // Remove old message and add updated one
  await kv.zrem(`messages:${cardId}`, match.serialized);
  await kv.zadd(`messages:${cardId}`, { score: Date.now(), member: JSON.stringify(updatedMessage) });

  return { success: true };
}
