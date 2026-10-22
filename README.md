# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Mirror Mirror Clone

### この変更で用意したもの

- SQLiteの予約データベース（`data/reservations.sqlite`）
- 予約データを保存する `POST /api/reservations`
- 管理画面から一覧を読む `GET /api/admin/reservations`
- Q&A登録用の `qa_entries` テーブル

管理画面と既存フォームは変更していません。**そのため今の予約フォームを送信してもDBには保存されません。** フォームの送信処理から保存APIを呼び出すと、保存が始まります。

### 開発環境

Node.js 22.13 以降を使います。開発サーバーと保存APIは、まとめて次のコマンドで起動します。

```sh
npm install
npm run dev
```

予約データはプロジェクト内の `data/reservations.sqlite` に保存されます。DBとSQLiteの一時ファイルはGit管理対象外です。

### 既存フォームから保存する方法

フォームの送信ハンドラーで、入力値をそのままJSONとしてAPIへ送ります。たとえば `react-hook-form` の `onSubmit(data)` なら、次のように接続できます。

```ts
const response = await fetch("/api/reservations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

if (!response.ok) {
  throw new Error("予約を保存できませんでした");
}

const { id } = await response.json();
```

### 保存APIの入力形式

`POST /api/reservations` は、現在のフォームの入力名をキーにしたJSONを受け取ります。`selectedPlace` は任意です。

```json
{
  "year": 2027,
  "month": 10,
  "day": 20,
  "selectedPlace": "東京ステーションホテル",
  "ceremonyPlace": "東京ステーションホテル",
  "partyPlace": "東京ステーションホテル",
  "lastName": "山田",
  "firstName": "花子",
  "lastNameFurigana": "やまだ",
  "firstNameFurigana": "はなこ",
  "birthYear": 1995,
  "birthMonth": 4,
  "birthDay": 12,
  "height": 160,
  "size": "M",
  "footsize": 23,
  "email": "hanako@example.com",
  "phone": 9012345678,
  "groomLastName": "山田",
  "groomFirstName": "太郎",
  "groomLastNameFurigana": "やまだ",
  "groomFirstNameFurigana": "たろう"
}
```

成功時は `201` と `{ "id": 1 }` を返します。このJSON例の年・月・日、身長、靴サイズ、電話番号は数値です。挙式日・生年月日は従来どおりISO日付でも保存し、各パーツを別々の `INTEGER` 列にも保存します。身長・靴サイズ・電話番号も `INTEGER` 列です。画面のフォーム値は文字列で届いてもAPI側で数値に変換します。電話番号は数値化すると先頭の `0` が失われます。ここでは `09012345678` を `9012345678` として送ります。再表示するときは桁数に応じて先頭の `0` を補ってください。

DBの列追加は `server/migrations/002_add_additional_reservation_fields.sql` にあります。すでに作成済みのDBにも、次回 `npm run dev` または `npm run server` を起動したときに自動適用されます。マイグレーション履歴は `schema_migrations` で管理します。

### 管理画面用API

管理画面から予約一覧を取得するAPIも用意しています。`ADMIN_API_TOKEN` を設定し、Bearerトークンを付けて呼び出します。

```sh
ADMIN_API_TOKEN='十分に長いランダムな値' npm run dev
```

```http
GET /api/admin/reservations?limit=50
Authorization: Bearer <ADMIN_API_TOKEN>
```

取得上限は1回100件です。トークンが未設定の場合、管理APIは `503` を返します。
ブラウザーにトークンを埋め込むと利用者から見えてしまうため、本番の管理画面ではサーバー側からこのAPIを呼び出してください。ログイン画面やセッション管理は今回の範囲に含めていません。

### Q&Aテーブル

`qa_entries` は管理画面で登録するQ&Aデータ用のテーブルです。質問文、回答文、表示順、公開状態、作成・更新日時を保持します。`is_published` は `1` が公開、`0` が非公開で、新規レコードは公開状態になります。

テーブル定義は `server/migrations/003_create_qa_entries.sql` にあります。次回API起動時に既存DBへも自動適用されます。現時点では `QA.tsx` の表示や管理画面からの登録処理は、このテーブルに接続していません。

管理画面から登録する1件分のデータ例です。`display_order` と `is_published` は数値で保存します。

```json
{
  "question": "来店予約は必要ですか？",
  "answer": "ご試着は完全予約制です。WebサイトのReservationからお申し込みください。",
  "display_order": 1,
  "is_published": 1
}
```
