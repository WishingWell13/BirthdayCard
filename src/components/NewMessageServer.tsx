import MessageFormServer from './MessageFormServer';
import BackToCardButton from './BackToCardButton';

interface NewMessageServerProps {
  cardId: string;
  authorName: string;
  recipientName: string;
  onBackToCard?: () => void;
  submitted: boolean;
}

export default function NewMessageServer({ cardId, authorName, recipientName, onBackToCard, submitted }: NewMessageServerProps) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-xl font-semibold mb-2 bg-pink-900 text-white px-6 py-4 rounded shadow">
        Leave a message for {recipientName}!
      </h2>
      {submitted ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="text-green-600 font-semibold">Thank you for your message!</div>
          {onBackToCard && <BackToCardButton onBackToCard={onBackToCard} />}
        </div>
      ) : (
        <MessageFormServer cardId={cardId} authorName={authorName} />
      )}
    </div>
  );
}
