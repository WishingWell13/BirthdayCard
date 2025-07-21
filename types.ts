export type Card = {
  id: string;
  recipientName: string;
  dob: string;
  theme?: string;
};

export type Message = {
  id: string;
  cardId: string;
  authorName: string;
  messageText: string;
};
