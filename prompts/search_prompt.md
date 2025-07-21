Prompt 2: Interactive Viewing Features
Act as an expert frontend developer. I need to add two interactive features to the card viewing page (app/card/[cardId]/CardViewClient.tsx): a client-side message search and a word cloud generator.

Feature A: Client-Side Message Search
State Management: In CardViewClient.tsx, add a new state for the search query: const [searchQuery, setSearchQuery] = useState('');

UI: Add an <input> field styled as a search bar above the message display area. Bind its value to searchQuery.

Filtering Logic:

Before rendering the messages, create a new memoized variable, filteredMessages.

This variable will be the result of filtering the messages prop. The filter logic should be case-insensitive and check if the searchQuery is included in either the authorName or messageText.

Render the filteredMessages array instead of the original messages prop.

Feature B: Word Cloud Generation
Install Library: npm install react-wordcloud

State Management: Add state to manage the visibility of a word cloud modal: const [showCloud, setShowCloud] = useState(false);

UI: Add a "Generate Word Cloud" button.

Logic:

When the button is clicked, it should set showCloud to true.

Create a function that processes the messages array: it should concatenate all messageText into a single string, split it into words, and count the frequency of each word.

Format this frequency map into the data structure required by react-wordcloud (e.g., [{ text: 'happy', value: 64 }, ...]).

Conditionally render a modal when showCloud is true. Inside the modal, render the <Wordcloud /> component with the processed data.

