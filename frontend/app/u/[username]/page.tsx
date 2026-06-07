import Link from "next/link";
import { notFound } from "next/navigation";

import ProfileSummary from "@/components/ProfileSummary";
import RatingChart from "@/components/RatingChart";
import { getInsights, UserNotFoundError } from "@/lib/api";
import { Insights } from "@/lib/types";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const decoded = decodeURIComponent(username);

  let data: Insights;
  try {
    data = await getInsights(decoded);
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      notFound();
    }
    throw e;
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 p-6 sm:p-8">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        ← 別のユーザーを検索
      </Link>

      <div className="mt-4 space-y-8">
        <ProfileSummary profile={data.profile} />
        <RatingChart history={data.ratingHistory} />
      </div>
    </main>
  );
}
