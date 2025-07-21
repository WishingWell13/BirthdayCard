
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';
import { Card } from '@/types';
import Link from 'next/link';

// Import Vercel KV client (assume @vercel/kv is installed and .env is configured)
import { kv } from '@vercel/kv';

async function createCard(formData: FormData) {
  'use server';
  const recipientName = formData.get('recipientName') as string;
  const dob = formData.get('dob') as string;
  const theme = (formData.get('theme') as string) || 'light';
  const id = nanoid();
  const card: Card = { id, recipientName, dob, theme };
  await kv.set(`card:${id}`, card);
  redirect(`/link/${id}`);
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-300 p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Create a Birthday Card</h1>
        <div className="mb-2 text-center">
          <Link
            href="/about"
            className="text-sm text-blue-700 underline hover:text-blue-900 transition"
          >
            How does this work?
          </Link>
        </div>
        <form action={createCard} className="flex flex-col gap-4">
          <label className="font-medium text-black">Recipient&apos;s Name</label>
          <input
            name="recipientName"
            type="text"
            required
            className="border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black bg-white placeholder-black/70"
            placeholder="e.g. Jane Doe"
          />
          <label className="font-medium text-black">Date of Birth</label>
          <input
            name="dob"
            type="date"
            required
            className="border border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-900 text-black bg-white"
          />
          <label className="font-medium text-black">Choose a Theme</label>
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="theme" value="light" defaultChecked className="accent-blue-900" />
              Light
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="theme" value="dark" className="accent-blue-900" />
              Dark
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="theme" value="forest" className="accent-blue-900" />
              Forest
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-900 text-white font-semibold py-2 rounded hover:bg-blue-950 transition"
          >
            Create Card
          </button>
        </form>
      </div>
    </main>
  );
}
