# 💌 Shareable Digital Birthday Card

## About The Project

This application lets you create a unique, shareable digital birthday card for friends and family. Each card has its own link, allowing guests to leave heartfelt messages for the recipient. The recipient enjoys a beautiful, interactive experience with all the messages collected in one place.

## Key Features

- **Unique, shareable link generation for each card**
- **Scheduled delivery using Vercel Cron Jobs**
- **Guest flow for leaving new messages**
- **Intelligent name recognition for returning users to edit their messages**
- **A dedicated, clean view for the recipient to see all messages**
- **Dual viewing modes for the recipient: a standard list and an interactive "floating bubble" display**

## Built With

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [React & TypeScript](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)
- [Framer Motion](https://www.framer.com/motion/)

## User Flows

### The Card Creator
- Visits the homepage to create a new card.
- Fills in the recipient's name, date of birth, and schedules a delivery time.
- Upon submission, is redirected to a dedicated link-sharing page.
- This page provides two distinct links: one to share with guests (`/[cardId]`) and a direct link for the recipient to view the final card (`/card/[cardId]`).

### The Guest (Leaving a Message)
- Navigates to the guest link (`/[cardId]`).
- Is prompted to enter their name.
- If they are a new user, they are shown a form to write and submit their message.
- If the system recognizes their name, they are shown their previously submitted message(s) with an option to edit them.

### The Recipient (Viewing the Card)
- Navigates to the direct view link (`/card/[cardId]`), likely shared by the creator.
- Sees a clean display of all the messages left for them.
- Can use a toggle in the upper-right corner to switch between the default "Bubble View" and a "List View".

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/WishingWell13/BirthdayCard.git
   cd BirthdayCard
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file in the project root.
   - Add the required keys from Vercel KV:
     ```env
     KV_URL=your_kv_url
     KV_REST_API_URL=your_kv_rest_api_url
     KV_REST_API_TOKEN=your_kv_rest_api_token
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

---

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

For more details, see the codebase and comments, or reach out via GitHub Issues.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

