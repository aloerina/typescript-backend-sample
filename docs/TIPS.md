# TIPS

仕様や機能に関することは Confluence に残す。
ここでは、開発環境やリポジトリ、実装内容などに関する技術的な補足説明を記載する。
のちに Confluence なり Jira なりで管理してもいいと思うが、一旦現状はリポジトリの中にまとめておく。

## ts-node で tsconfig の extends 周りが不安定

- typescript とのバージョン組み合わせによって node_modules を見に行ってくれない
  - https://github.com/TypeStrong/ts-node/issues/2076
- 複数ベースコンフィグを extends に定義するとエラーになる
  - https://github.com/TypeStrong/ts-node/issues/2000

一時的な回避策として ts-node 用の tsconfig (`tsconfig.tsnode.json`) を作成して、直接読み込ませる方式が提案されていたので採用する。

## Express の Request.body や Request.params に型を付与する

https://zenn.dev/yhase_rqp/articles/3a89c0354061c2#%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%81%AE%E5%9E%8B%E5%AE%9A%E7%BE%A9%E3%82%92%E9%81%A9%E7%94%A8%E3%81%97%E3%82%88%E3%81%86

## Express の Route 実装時に async/await が使えない

`app.get()` 等の URL/HTTP メソッドと Controller を紐づける系の第二引数に Promise を返す関数を指定すると怒られるっぽい。  
通常の Request/Response 型を使う分には Promise を処理するラッパー関数を実装するなどでシンプルに対応可能らしいが単に記事を真似するだけだと型関連のエラー解決が自力でできなかったのでライブラリに頼る。    
Express 5 からは Express の中で async/await をうまく処理してくれる仕組みができる模様なので、それが実装されたら移行を検討する。 

- ラッパーを作れば良いという記事：https://qiita.com/yukin01/items/1a36606439123525dc6d
- wrapper ライブラリ：https://www.npmjs.com/package/@myrotvorets/express-async-middleware-wrapper
- Express 5 の主要なゴールの一つは Promise の基本的なサポートを提供することらしい：https://github.com/expressjs/express/pull/2237


## VSCode の Prettier が ignore 系ファイルのフォーマットに失敗する

https://github.com/prettier/prettier-vscode/issues/3063

一旦 ignore 系のファイルだけ自動フォーマットしないように defaultFormatter に null を指定しておく。

## git-secrets で秘密情報の push を検知した場合に CI 上のログでその秘密情報が平文表示されてしまう

現段階では CI 失敗後に対象のログを削除して対応する。  
各自のローカル環境に導入することを徹底し、CI の git-secrets は防波堤の感覚で運用する。  
リポジトリの動きが少し緩慢なのであまり期待できないが、下記機能がマージされれば変な運用しなくてもよくなる。

https://github.com/awslabs/git-secrets/pull/229

## `process.env` で自動補完が効くようにする

`ProcessEnv` インタフェースを拡張してキーを定義し、自動補完できるようにする。  
環境変数を追加する際は `src/types/env.d.ts` も合わせて修正する。

https://zenn.dev/ken7253/articles/env-variable-type-definition


## `prisma migrate dev` を実行するための DB ユーザ権限

prisma migrate では移行処理中の確認用に shadow database と呼ぶ一時的なデータベースを作成する。  
そのデータベースを作成するために必要な権限が、ただの特権だと不足しているらしいので追加する。  
なお、`prisma migrate deploy` などの本番適用目的のコマンドでは shadow database は作られないため、開発時のみ必要とのこと。

- https://zenn.dev/prog24/scraps/159cfebf431e5b
- https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database#shadow-database-user-permissions

## PrismaClient インスタンスの取り扱いについての TIPS

作成した PrismaClient インスタンスはシステムで単一であることを保証すべきとのこと。

- https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-long-running-applications

## Prisma を docker image に含めるための TIPS

### Node.js 公式の `node-bookworm-slim` イメージには OpenSSL が含まれていない

Prisma は OpenSSL を必要とする。
また、Prisma が期待する OpenSSL のバージョンとシステム側の OpenSSL が異なるとエラーになる。

https://zenn.dev/monicle/articles/2283179d63d407


ワークアラウンドはいくつかあるが、方針としては脆弱性への耐性を優先し、Node.js のバージョンをできるだけ最新に維持できる方法を取る。
Node の公式 slim イメージで、かつ Debian も最新のバージョンを利用したい。
条件に合致する `node-bookworm-slim` を採用したいが、そのアップストリームである Debian の公式イメージ `bookworm-slim` で OpenSSL が含まれていない。

- https://github.com/prisma/prisma/issues/19729

なので、`node-bookworm-slim` を採用し、OpenSSL を別途インストールして対応する。

### Prisma 側で利用する OpenSSL のバージョン指定

OpenSSL の 3.0.x をインストールしたものの、Prisma はデフォルトだと 1.1.x を利用するようになっている模様。  
Prisma Generator の `binaryTargets` で利用する OpenSSL のバージョンを指定する必要がある。

https://tech-blog.s-yoshiki.com/entry/297

