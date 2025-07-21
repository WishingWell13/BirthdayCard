Prompt 3: Content Creation Aids
Act as a frontend developer. I need to improve the message creation experience in NewMessage.tsx by adding message templates.

Location: NewMessage.tsx and its child component MessageForm.tsx.

State Management: The state for the <textarea>'s value needs to be managed within the MessageForm component. Convert it to a controlled component using useState.

UI: In NewMessage.tsx, add a button styled with an icon (e.g., a lightbulb) and text "Need Inspiration?".

Logic:

Define a static array of message templates (e.g., ["Happy Birthday! Wishing you the best...", "Hope you have a fantastic day!"]).

When the "Inspiration" button is clicked, it should select a random template from the array and call a function passed down from MessageForm to update the textarea's state with the template text.

Prompt 4: Content Formatting & Exporting
Act as a full-stack developer. I need to add Markdown support for messages and a feature to download the card as an image.

Feature A: Basic Markdown Support
Install Library: npm install react-markdown

Display Logic:

In every component where message text is displayed (specifically MessageList.tsx, EditMessages.tsx when not editing, and the modal in BubbleDisplay.tsx), import ReactMarkdown.

Replace the existing <div className="whitespace-pre-wrap">{messageText}</div> with <ReactMarkdown className="prose">{messageText}</ReactMarkdown>. The prose class from Tailwind's typography plugin can provide nice default styling.

Input Logic: No changes are needed for the <textarea> elements, as they correctly capture the Markdown characters (*, _).

Feature B: Download as Image
Install Library: npm install html2canvas

Implementation (app/card/[cardId]/CardViewClient.tsx):

Add a "Download Card" button to the UI.

Assign a unique id to the main div that wraps the message display (e.g., <div id="card-to-download">...</div>).

The button's onClick handler should:

Get the DOM element using document.getElementById('card-to-download').

Call html2canvas() on that element.

In the resulting promise, convert the canvas to a PNG data URL using .toDataURL('image/png').

Create a temporary <a> element, set its href to the data URL and its download attribute to something like birthday-card.png, then programmatically click it to trigger the download.