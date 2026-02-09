# Playwright Test

Playwright E2E テストの検証用リポジトリ。ローカルのデモアプリに対して Chromium でテストを実行する。

## セットアップ

```bash
pnpm install
pnpm exec playwright install chromium
```

## テスト実行

```bash
# 全テスト実行
pnpm exec playwright test

# UI モード（インタラクティブ）
pnpm exec playwright test --ui

# headed モード（ブラウザ表示あり）
pnpm exec playwright test --headed

# 特定のテストだけ実行
pnpm exec playwright test -g "Counter"
```

## レポート確認

```bash
pnpm exec playwright show-report
```

## CI

GitHub Actions で push / PR 時に自動実行。

- Chromium のみ
- 失敗時にスクリーンショット・動画・トレースを取得
- ブラウザバイナリはキャッシュ済み
