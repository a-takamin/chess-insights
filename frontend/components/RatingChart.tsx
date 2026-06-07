"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { RatingHistory } from "@/lib/types";

export default function RatingChart({ history }: { history: RatingHistory[] }) {
  // 推移点を持つ種目だけを対象にし、点数が多い順に並べる
  const series = history
    .filter((h) => h.points.length > 0)
    .sort((a, b) => b.points.length - a.points.length);

  const [selected, setSelected] = useState(series[0]?.name ?? "");

  if (series.length === 0) {
    return (
      <section>
        <h2 className="mb-2 text-lg font-semibold">レート推移</h2>
        <p className="text-sm text-zinc-500">レート履歴がありません。</p>
      </section>
    );
  }

  const current = series.find((s) => s.name === selected) ?? series[0];

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">レート推移</h2>
        <select
          value={current.name}
          onChange={(e) => setSelected(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          {series.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name} ({s.points.length})
            </option>
          ))}
        </select>
      </div>

      <div className="h-80 w-full rounded-lg border border-zinc-200 p-2 dark:border-zinc-800">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={current.points}
            margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#88888833" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              minTickGap={40}
            />
            <YAxis
              domain={["dataMin - 50", "dataMax + 50"]}
              tick={{ fontSize: 11 }}
              width={48}
              allowDecimals={false}
            />
            <Tooltip
              labelFormatter={(label) => `${label}`}
              formatter={(value) => [value, "レート"]}
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
