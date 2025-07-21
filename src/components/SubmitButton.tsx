"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="mt-2 bg-pink-500 text-white font-semibold py-2 rounded hover:bg-pink-600 transition"
      disabled={pending}
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}
