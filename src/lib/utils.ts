import type { Message } from '@/types';

/**
 * Dedupes an array of messages based on their ID, keeping the last-seen version.
 * @param messages - The array of messages to deduplicate.
 * @returns A new array with unique messages.
 */
export function deduplicateMessages(messages: Message[]): Message[] {
  const map = new Map<string, Message>();
  messages.forEach(msg => {
    map.set(msg.id, msg);
  });
  return Array.from(map.values());
}