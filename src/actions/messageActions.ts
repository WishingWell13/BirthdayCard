"use server";

import { saveMessage } from '../actions/saveMessage';
import { redirect } from 'next/navigation';

export async function serverAction(formData: FormData) {
  const cardId = formData.get('cardId') as string;
  const authorName = formData.get('authorName') as string;
  await saveMessage(formData);
  redirect(`?submitted=1`);
}
