"use server";
import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';
import { Message } from '../types';

export async function saveMessage(formData: FormData) {
  const cardId = formData.get('cardId') as string;
  const authorName = formData.get('authorName') as string;
  const messageText = formData.get('messageText') as string;
  const id = nanoid();
  const message: Message = { id, cardId, authorName, messageText };
  await kv.zadd(`messages:${cardId}`, { score: Date.now(), member: JSON.stringify(message) });
}
