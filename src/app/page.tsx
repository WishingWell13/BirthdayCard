
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';
import { Card } from '../../types';

// Import Vercel KV client (assume @vercel/kv is installed and .env is configured)
import { kv } from '@vercel/kv';

async function createCard(formData: FormData) {
  'use server';
  const recipientName = formData.get('recipientName') as string;
  const dob = formData.get('dob') as string;
  const id = nanoid();
  const card: Card = { id, recipientName, dob };
  await kv.set(`card:${id}`, card);
  redirect(`/${id}`);
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Create a Birthday Card</h1>
        <form action={createCard} className="flex flex-col gap-4">
          <label className="font-medium">Recipient&apos;s Name</label>
          <input
            name="recipientName"
            type="text"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Jane Doe"
          />
          <label className="font-medium">Date of Birth</label>
          <input
            name="dob"
            type="date"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
          >
            Create Card
          </button>
        </form>
      </div>
    </main>
  );
}
