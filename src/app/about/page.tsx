import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold text-pink-900 mb-4 text-center">
          Creating a Birthday Surprise is Easy
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          This app helps you collect messages from friends and family to create a single, beautiful digital card for someone&apos;s birthday. It&apos;s simple, private, and fun for everyone involved!
        </p>
        <ol className="list-decimal list-inside text-left text-gray-800 space-y-4 mb-8">
          <li>
            <span className="font-semibold text-pink-900">Create Your Card:</span> Fill out the form with the recipient&apos;s name and birthday.
          </li>
          <li>
            <span className="font-semibold text-pink-900">Share the Links:</span> After creating your card, you&apos;ll get two unique links—one to share with guests for leaving messages, and a separate, private link for the recipient to view the final card.
          </li>
          <li>
            <span className="font-semibold text-pink-900">Guests Leave Messages:</span> Guests visit their link, enter their name, and write a personal message for the recipient. Returning guests can edit their own messages.
          </li>
          <li>
            <span className="font-semibold text-pink-900">View the Final Card:</span> The recipient uses their special link to see all the messages in a beautiful display, with options to switch between a bubble view and a list view.
          </li>
        </ol>
        <Link
          href="/"
          className="mt-4 bg-blue-900 text-white font-semibold py-3 px-8 rounded shadow-lg hover:bg-blue-950 transition text-lg"
        >
          Create a Card Now
        </Link>
      </div>
    </main>
  );
}
