"use server";
import { kv } from '@vercel/kv';
import type { Message } from '@/types';

export async function getMessages(cardId: string): Promise<Message[]> {
  const rawMessages = await kv.zrange(`messages:${cardId}`, 0, -1);
  // Handle both string and object cases
  return rawMessages.map((msg) => {
    if (typeof msg === 'string') {
      try {
        return JSON.parse(msg);
      } catch {
        return null;
      }
    }
    if (typeof msg === 'object' && msg !== null) {
      return msg;
    }
    return null;
  }).filter(Boolean);
}
