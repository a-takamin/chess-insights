"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim();
    if (u) {
      router.push(`/u/${encodeURIComponent(u)}`);
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">chess-insights</h1>
        <p className="mt-2 text-sm text-zinc-500">
          lichess のユーザー名から対局インサイトを表示します
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="lichess のユーザー名（例: DrNykterstein）"
          aria-label="lichess username"
          className="flex-1 rounded-md border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          disabled={!username.trim()}
          className="rounded-md bg-zinc-900 px-5 py-2 font-medium text-white transition hover:bg-zinc-700 disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          表示
        </button>
      </form>
    </main>
  );
}
