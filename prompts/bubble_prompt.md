Act as an expert full-stack developer specializing in the T3 Stack (Next.js App Router, TypeScript, Tailwind CSS) and frontend animations.

Your task is to generate the complete, production-ready code for a new React component, BubbleDisplay.tsx. This component will render an array of birthday messages as interactive, floating bubbles.

Context & Data Structure
The component will receive an array of Message objects as a prop. Assume the following TypeScript type definition:

TypeScript

type Message = {
  id: string;
  authorName: string;
  messageText: string;
};
Component Requirements
1. Layout & Styling
The main container should fill the viewport to provide ample space for the bubbles to float (relative w-full h-screen overflow-hidden).

Each bubble should be a motion.div from Framer Motion.

Randomized Appearance: To create a dynamic look, each bubble should have:

A random size, ranging from w-32 h-32 to w-48 h-48.

A random background color, chosen from a predefined array of pleasant, contrasting Tailwind CSS colors (e.g., bg-sky-400, bg-violet-400, bg-fuchsia-400, bg-teal-400).

A random initial position within the container.

The bubble's content should be centered, displaying the authorName prominently and a short snippet of the messageText (e.g., the first 5 words).

2. Animation
Gentle Floating: Implement a continuous, gentle floating animation. Use Framer Motion's animate and transition props.

Animate Property Example: animate={{ y: ["-3%", "3%", "-3%"], x: ["-2%", "2%", "-2%"] }}

Transition Property Example: The duration should be randomized for each bubble (e.g., duration: 10 + Math.random() * 8) with repeat: Infinity and repeatType: "reverse". This ensures the bubbles move asynchronously.

3. Interactivity & Modal
Use a simple useState hook to manage the modal state.

On Click: When a bubble is clicked, it should open a modal overlay that displays the full message content.

Modal Design:

The modal should have a semi-transparent backdrop (bg-black/60).

The content area should be a centered card with a close button (X) in the top-right corner.

Display the full authorName and messageText inside the modal.

4. Edge Case Handling
If the messages prop is an empty array, the component should not render bubbles. Instead, it should display a single, centered message like "No messages yet. Be the first to leave one!"

Please provide the full BubbleDisplay.tsx file, including all necessary imports from React and Framer Motion, TypeScript definitions, and Tailwind CSS classes.