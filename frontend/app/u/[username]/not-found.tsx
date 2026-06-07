import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold">ユーザーが見つかりません</h1>
      <p className="text-sm text-zinc-500">
        lichess に該当するユーザー名が存在しないようです。
      </p>
      <Link
        href="/"
        className="rounded-md bg-zinc-900 px-5 py-2 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        トップに戻る
      </Link>
    </main>
  );
}
