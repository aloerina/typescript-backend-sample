# 開発中の各種作業手順

## 実装後の確認手順

1. `npm run lint` で全ての Lint チェックが通っていること
2. `npm run build:all` で全てのスキーマの更新を反映した状態で TS のビルドが通っていること
3. `npm run test` で全てのテストが通っていること
4. `npm run docker:build` で正しくコンテナイメージが作成できること
5. `npm run docker:up` で作成したイメージを元にコンテナが起動できること
   1. `docker ps` で起動したコンテナが正常に動作していることを確認する
6. ブラウザや curl などで `http://localhost:3080/users` にアクセスできること


## OpenAPI Spec の更新

### 大まかな流れ

1. `openapi/openapi.yaml` を修正する
   1. Stoplight Studio での編集を推奨
2. `npm run lint:openapi` で OpenAPI Spec の lint が通っているか確認する
3. `npm run aspida` で Request/Response の型コードを生成/更新する
4. 生成/更新した型を使って実装する


## DB スキーマ(Prisma)の更新とマイグレーション

### 大まかな流れ

1. `prisma/schema.prima` を修正する
2. `npm run prisma:migrate` でマイグレーションを実行する
3. 必要に応じて仮データを投入する
   1. リレーションが簡素であれば `npm prisma:studio` で UI から投入すると楽
4. `npm run db:dump` で DB の初期データを更新する
5. `npm run db:cleanup` で DB を初期化再起動し、スキーマと初期データが更新されていることを確認する

### マイグレーションの実行例

`Are you sure you want to create and apply this migration?` は `yes` を入力します。
`Enter a name for the new migration:` でマイグレーションに対して名前をつける。更新した内容がわかるような名前をつけてください。

```
❯ npm run prisma:migrate

> ts-sample@1.0.0 prisma:migrate
> npx prisma migrate dev

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": MySQL database "sample" at "127.0.0.1:3306"


⚠️  Warnings for the current datasource:

  • A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

✔ Are you sure you want to create and apply this migration? … yes
✔ Enter a name for the new migration: … modify_users_email_unique_and_required
```

### データが存在する既存のテーブルに `NOT NULL` と `UNIQUE` 制約のカラムを追加する手順

データが存在する既存テーブルに `NOT NULL` 制約のカラムを追加する場合は、下記のように2回マイグレーションを実行します。

1. 一旦デフォルト値を指定してカラムを追加する（追加後、全データに対して適切な値を設定する）
2. 対象カラムのデフォルト値を外す

`NOT NULL` と `UNIQUE` 制約を同時に付与したい場合は、カラム追加後に全データ重複しないよう値を設定した後、デフォルト値を外すと同時に `UNIQUE` 制約を付与するようにしてください。
