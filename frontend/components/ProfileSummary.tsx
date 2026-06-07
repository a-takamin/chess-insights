import { Profile } from "@/lib/types";

function formatPlayTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  if (hours >= 1) return `${hours.toLocaleString()} 時間`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes} 分`;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function winRate(win: number, total: number): string {
  if (total === 0) return "—";
  return `${((win / total) * 100).toFixed(1)}%`;
}

export default function ProfileSummary({ profile }: { profile: Profile }) {
  const { count } = profile;

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-baseline gap-3">
        {profile.title && (
          <span className="rounded bg-amber-500 px-2 py-0.5 text-sm font-bold text-white">
            {profile.title}
          </span>
        )}
        <h1 className="text-3xl font-bold">{profile.username}</h1>
        {profile.url && (
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:underline"
          >
            lichess で開く ↗
          </a>
        )}
      </header>

      {profile.disabled && (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
          このアカウントは閉鎖されています。公開データは表示できません。
        </p>
      )}

      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="総対局数" value={count.all.toLocaleString()} />
        <Stat label="勝率" value={winRate(count.win, count.all)} />
        <Stat label="アカウント作成" value={formatDate(profile.createdAt)} />
        <Stat label="総プレイ時間" value={formatPlayTime(profile.playTimeSeconds)} />
      </dl>

      <div className="flex flex-wrap gap-4 text-sm">
        <span className="text-green-600 dark:text-green-400">
          勝ち {count.win.toLocaleString()}
        </span>
        <span className="text-red-600 dark:text-red-400">
          負け {count.loss.toLocaleString()}
        </span>
        <span className="text-zinc-500">
          引き分け {count.draw.toLocaleString()}
        </span>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold">種目別レーティング</h2>
        {profile.perfs.length === 0 ? (
          <p className="text-sm text-zinc-500">対局データがありません。</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {profile.perfs.map((p) => (
              <div
                key={p.key}
                className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <div className="text-xs uppercase tracking-wide text-zinc-500">
                  {p.key}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{p.rating}</span>
                  {p.provisional && (
                    <span className="text-xs text-zinc-400">?</span>
                  )}
                  <ProgBadge prog={p.prog} />
                </div>
                <div className="text-xs text-zinc-500">
                  {p.games.toLocaleString()} 局
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
      <dt className="text-xs text-zinc-500">{label}</dt>
      <dd className="mt-1 text-lg font-semibold">{value}</dd>
    </div>
  );
}

function ProgBadge({ prog }: { prog: number }) {
  if (prog === 0) return null;
  const up = prog > 0;
  return (
    <span
      className={`text-xs font-medium ${
        up ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
      }`}
    >
      {up ? "▲" : "▼"}
      {Math.abs(prog)}
    </span>
  );
}
