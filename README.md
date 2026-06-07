# chess-insights

lichess のユーザー名を入力すると、そのアカウントの対局インサイト（プロフィール概要＋レート推移グラフ）を表示する Web アプリ。

## 構成（モノレポ）

| ディレクトリ | 役割 | 技術 |
|---|---|---|
| `backend/` | lichess 公開 API を呼び、整形した JSON を返す REST API | Java 17 / Spring Boot / Gradle (Kotlin DSL) |
| `frontend/` | ユーザー名入力・結果表示 | Next.js (App Router) / TypeScript / Tailwind / Recharts |

フロントの Server Component がバックエンド `GET /api/insights/{username}` を呼び出す。
バックエンドは lichess の `GET /api/user/{username}` と `/rating-history` を取得し、
レート履歴の日付（lichess は月が0始まり）などを正規化して返す。

詳細な設計は [`docs/mvp-plan.md`](docs/mvp-plan.md) を参照。

## 起動方法

2 つのターミナルで以下を実行する。

### 1. バックエンド（:8080）

```sh
cd backend
./gradlew bootRun
```

動作確認:

```sh
curl http://localhost:8080/api/insights/DrNykterstein
```

### 2. フロントエンド（:3000）

```sh
cd frontend
pnpm install
pnpm dev
```

ブラウザで http://localhost:3000 を開き、lichess のユーザー名（例: `DrNykterstein`）を入力する。

> フロントは `frontend/.env.local` の `API_BASE_URL`（既定 `http://localhost:8080`）でバックエンドを参照する。

## API 契約

`GET /api/insights/{username}`

- 200: `{ profile: {...}, ratingHistory: [...] }`
- 404: `{ "error": "user_not_found" }`（lichess に該当ユーザーなし）
- 429: `{ "error": "rate_limited" }`（lichess のレート制限）

## Docker

各サービスに `Dockerfile` がある（backend: マルチステージ Gradle ビルド → JRE、frontend: Next.js standalone）。

```sh
# ビルド
docker build -t chess-insights-backend ./backend
docker build -t chess-insights-frontend ./frontend

# 起動（同一ネットワークでフロント→バックを名前解決）
docker network create chess-net
docker run -d --name backend --network chess-net chess-insights-backend
docker run -d --name frontend --network chess-net \
  -e API_BASE_URL=http://backend:8080 -p 3000:3000 chess-insights-frontend
```

## CI / イメージ公開

`.github/workflows/docker-publish.yml` が **main への push（マージ）** で
両サービスのイメージをビルドし、`ghcr.io` に push する。

- `ghcr.io/<owner>/chess-insights/backend`
- `ghcr.io/<owner>/chess-insights/frontend`

タグは `latest` と `sha-<commit>`。認証は GitHub Actions の `GITHUB_TOKEN`（`packages: write`）を使用。

## 今後の拡張（参考）

- 直近 N 局の取得による白黒別勝率・オープニング別勝率・精度(accuracy)推移
- 種目別詳細統計（最高/最低レート・ベストウィン・連勝連敗）

