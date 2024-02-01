# notion_docsbot_integration_sample

Notion DB と DocsBot の API 連携サンプルプロジェクト（DocsBot 連携は未実装）

- Notion API: <https://developers.notion.com/reference/intro>
- Notion Javascript SDK: <https://github.com/makenotion/notion-sdk-js>
- DocsBot API: <https://docsbot.ai/documentation/developer/source-api>

## How to use

- `npm install` で依存関係をインストール

- /config/config.json に以下を記載

  - `notion.sourceDBId`: データ取得元 DB の ID
  - `notion.targetDBId`: データ更新先 DB の ID
  - `notion.apiToken`: Notion API のトークン

- `npx ts-node src/index.ts` でプログラム実行

  - データ取得元 DB からデータを取得し、データ更新先 DB に取得データのレコードを追加
  - クエリ条件は src/notion/api.ts にハードコード（暫定）
  - 取得元 / 更新先 DB は同じ DB スキーマであることを想定（暫定）
