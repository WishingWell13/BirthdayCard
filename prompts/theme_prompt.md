Prompt 1: Visuals & Theming
Act as an expert full-stack developer. I need to implement two visual features: selectable card themes for the creator and a confetti effect for the recipient.

Feature A: Selectable Card Themes
Database Schema: In types.ts, update the Card type to include an optional theme property:

TypeScript

type Card = {
  // ... existing fields
  theme?: string;
};
Creation Form (app/page.tsx):

In the "Create a Birthday Card" form, add a section for "Choose a Theme".

Use radio buttons to provide at least three options: Light (default), Dark, and Forest.

Ensure the selected theme's value is submitted with the form.

Server Action (createCard):

Update the createCard server action to receive the theme from the form data and save it to the new Card object in Vercel KV.

Theme Application:

On the main card viewing page (app/card/[cardId]/page.tsx), fetch the card's theme.

Apply the theme as a class name to the root <body> or a main wrapper <div> (e.g., className={card.theme || 'light'}).

In app/globals.css, define the CSS variables for each theme:

CSS

:root { /* Light Theme */
  --bg-color: #ffffff; --text-color: #1f2937; --primary-color: #4f46e5;
}
.dark {
  --bg-color: #1f2937; --text-color: #f3f4f6; --primary-color: #818cf8;
}
.forest {
  --bg-color: #f0fff4; --text-color: #2f4f4f; --primary-color: #228b22;
}
Update existing components to use these CSS variables (e.g., bg-[var(--bg-color)] text-[var(--text-color)]).

Feature B: Confetti on Load
Install Library: npm install canvas-confetti

Implementation (app/card/[cardId]/CardViewClient.tsx):

In this client component, use a useEffect hook with an empty dependency array ([]).

Inside the useEffect, import canvas-confetti and call it to trigger a celebratory animation as soon as the component mounts.