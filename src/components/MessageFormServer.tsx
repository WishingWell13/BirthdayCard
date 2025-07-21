
import { serverAction } from '../actions/messageActions';


interface MessageFormServerProps {
  cardId: string;
  authorName: string;
  onBackToCard?: () => void;
}





export default function MessageFormServer({ cardId, authorName }: MessageFormServerProps) {
  return (
    <form action={serverAction} className="flex flex-col gap-4">
      <input type="hidden" name="cardId" value={cardId} />
      <input type="hidden" name="authorName" value={authorName} />
      <label className="font-bold text-black bg-yellow-300 px-2 py-1 rounded">Your Message</label>
      <textarea
        required
        name="messageText"
        className="border-2 border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black bg-white placeholder-black/70"
        rows={4}
        placeholder="Write something nice..."
      />
      <button
        type="submit"
        className="mt-2 bg-pink-500 text-white font-semibold py-2 rounded hover:bg-pink-600 transition"
      >
        Send Message
      </button>
    </form>
  );
}
