import { describe, expect, it } from 'vitest';

import { deduplicateMessages } from '../utils';

describe('deduplicateMessages', () => {
  it('returns an empty array when given no messages', () => {
    expect(deduplicateMessages([])).toEqual([]);
  });

  it('keeps all messages when there are no duplicates and returns a new array', () => {
    const messages = [
      { id: '1', cardId: 'card', authorName: 'Alice', messageText: 'Hello' },
      { id: '2', cardId: 'card', authorName: 'Bob', messageText: 'Hi there' },
    ];

    const result = deduplicateMessages(messages);

    expect(result).toEqual(messages);
    expect(result).not.toBe(messages);
  });

  it('removes duplicate message ids while keeping the last entry for each id', () => {
    const first = { id: '1', cardId: 'card', authorName: 'Alice', messageText: 'First' };
    const second = { id: '2', cardId: 'card', authorName: 'Bob', messageText: 'Second' };
    const updatedFirst = { id: '1', cardId: 'card', authorName: 'Alice', messageText: 'Updated' };
    const messages = [first, second, updatedFirst];

    const result = deduplicateMessages(messages);

    expect(result).toHaveLength(2);
    expect(result.map(msg => msg.id)).toEqual(['1', '2']);
    expect(result[0].messageText).toBe('Updated');
    expect(result[1]).toBe(second);
  });
});
