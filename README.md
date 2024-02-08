# TypeScript の バックエンドサンプル

## 開発に着手する前に

`git clone` する前に [git-secrets の設定](./docs/dev-env.md#git-secrets-のセットアップ)を完了しておいてください。  
git-secrets 設定前に `git clone` した場合は、git-secrets の設定後に `git init` するか、再度 `git clone` しなおしてください。

[ソフトウェア設計](./docs/architecture.md)を一読し、どの役割のコードをどのソフトウェアレイヤに実装すればいいかについて会話ができるようにしてください。


## Getting Started

[開発環境構築](./docs/dev-env.md) を参考に開発に必要なツールやランタイムのセットアップを完了してください。  
セットアップ完了後、下記手順でローカル環境での起動・動作確認を行なってください。

```
npm install
npm run build:all
npm run db:up
npm debug

# app 動作確認
curl http://localhost:3000/health

# DB へのアクセス含めた動作確認
curl http://localhost:3000/users
```


## ドキュメントリンク

- [開発環境構築](./docs/dev-env.md)
- [ソフトウェア設計](./docs/architecture.md)
- [開発中の各種作業手順](./docs/dev-tasks.md)
- [TIPS](./docs/TIPS.md)
