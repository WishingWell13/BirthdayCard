"use server";
import { kv } from '@vercel/kv';
import type { Message } from '../../types';

export async function deleteMessages(cardId: string, recipientName: string, messages: Message[]): Promise<{ success: boolean; error?: string }> {
  // Fetch card details
  const card = await kv.get(`card:${cardId}`);
  if (!card || typeof card !== 'object' || !('recipientName' in card)) {
    return { success: false, error: 'Card not found' };
  }
  // Verify recipient
  if ((card.recipientName as string).trim().toLowerCase() !== recipientName.trim().toLowerCase()) {
    return { success: false, error: 'Unauthorized' };
  }
  // Remove all selected messages from sorted set in one request
  const members = messages.map(m => JSON.stringify(m));
  await kv.zrem(`messages:${cardId}`, ...members);
  return { success: true };
}
