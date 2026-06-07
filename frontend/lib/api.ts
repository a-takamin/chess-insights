import { Insights } from "./types";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

/** 該当ユーザーが存在しない場合に投げる。 */
export class UserNotFoundError extends Error {}

/** バックエンドから整形済みインサイトを取得する（Server Component から呼ぶ）。 */
export async function getInsights(username: string): Promise<Insights> {
  const res = await fetch(
    `${API_BASE_URL}/api/insights/${encodeURIComponent(username)}`,
    { next: { revalidate: 300 } },
  );

  if (res.status === 404) {
    throw new UserNotFoundError(username);
  }
  if (!res.ok) {
    throw new Error(`インサイトの取得に失敗しました (status ${res.status})`);
  }
  return res.json();
}
