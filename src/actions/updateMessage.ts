"use server";
import { kv } from '@vercel/kv';
import type { Message } from '@/types';

export async function updateMessage(cardId: string, messageId: string, newMessageText: string): Promise<{ success: boolean; error?: string }> {
  const rawMessages = await kv.zrange(`messages:${cardId}`, 0, -1);
  let found: Message | null = null;
  for (const msg of rawMessages) {
    let parsed: Message | null = null;
    if (typeof msg === 'string') {
      try { parsed = JSON.parse(msg); } catch { parsed = null; }
    } else if (typeof msg === 'object' && msg !== null) {
      parsed = msg as Message;
    }
    if (parsed && parsed.id === messageId) {
      found = parsed;
      break;
    }
  }
  if (!found) return { success: false, error: 'Message not found' };
  found.messageText = newMessageText;
  // Remove old message and add updated one
  await kv.zrem(`messages:${cardId}`, JSON.stringify(found));
  await kv.zadd(`messages:${cardId}`, { score: Date.now(), member: JSON.stringify(found) });
  return { success: true };
}
