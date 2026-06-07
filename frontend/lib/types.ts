// バックエンド GET /api/insights/{username} のレスポンス型

export type Perf = {
  key: string;
  rating: number;
  games: number;
  prog: number;
  provisional: boolean;
};

export type Count = {
  all: number;
  win: number;
  loss: number;
  draw: number;
};

export type Profile = {
  username: string;
  title: string | null;
  createdAt: string | null; // ISO 8601（閉鎖アカウント等では欠落）
  url: string | null;
  playTimeSeconds: number;
  count: Count;
  perfs: Perf[];
  disabled: boolean; // 閉鎖済みアカウント
};

export type RatingPoint = {
  date: string; // YYYY-MM-DD
  rating: number;
};

export type RatingHistory = {
  name: string;
  points: RatingPoint[];
};

export type Insights = {
  profile: Profile;
  ratingHistory: RatingHistory[];
};
