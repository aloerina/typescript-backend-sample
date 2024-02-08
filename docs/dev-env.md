# 開発環境構築

## git-secrets のセットアップ

git の hook 機能を活用し、`git commit` 実行時に API キーなどの機密情報が含まれていないかチェックできるようにするツールです。  

ツールをインストールします。

```
brew install git-secrets
```

git の init template に git-secrets 用の hooks を登録します。  
通常、リポジトリごとに `git secrets --install` の実行が必要ですが、下記設定によって `git init` や `git clone` 実行時に自動で git-secrets 用の hooks が追加されるようになります。

```
# 実行時に音声読み上げが実行されますが、読み上げきるまで待つ必要があります
git secrets --install ~/.git-templates/git-secrets
git config --global init.templatedir '~/.git-templates/git-secrets'
```

AWS 関連の機密情報を commit 時にチェックするルールを設定します。

```
git secrets --register-aws --global
```

動作確認を行います。  
下記の `{{ secret }}` を `AKIAIOSFODNN7EXAMPLE` の最後の一文字を `A` に変更した文字列に修正して実行し、git-secrets によってcommit が弾かれることを確認してください。
万が一 commit できてしまった場合、`git reset --hard HEAD^` で commit を取り消してください。

```
$ echo {{ secret }} > hoge
$ git add hoge
$ git commit -m "git-secret test"
hoge:1:{{ secret }}

[ERROR] Matched one or more prohibited patterns

Possible mitigations:
- Mark false positives as allowed using: git config --add secrets.allowed ...
- Mark false positives as allowed by adding regular expressions to .gitallowed at repository's root directory
- List your configured patterns: git config --get-all secrets.patterns
- List your configured allowed patterns: git config --get-all secrets.allowed
- List your configured allowed patterns in .gitallowed at repository's root directory
- Use --no-verify if this is a one-time false positive
```

参考：https://zenn.dev/kkk777/articles/8f55db1e9678f2


## Node.js のセットアップ

好みの方法でインストールできれば問題ありません。
ここでは asdf-vm を使ったインストール手順を記載します。

https://asdf-vm.com/guide/getting-started.html

公式の Getting Start が Node.js を例に手順を書いているので、「4. Install a Plugin」まで完了したら下記を実行してください。

指定したバージョンの Node.js 環境がインストールされます。

```
asdf install nodejs 20.10.0
```

グローバルで利用するバージョンをインストールしたバージョンにセットします。

```
asdf global nodejs 20.10.0
```

動作確認。

```
❯ node -v
v20.10.0
❯ npm -v
10.2.3
```

## Prettier/ESLint のセットアップ

ツール自体は npm パッケージに含まれるので、VSCode のエクステンションのインストールのみ。

- [VSCode の Prettier エクステンション](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [VSCode の ESLint エクステンション](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)


## Docker Desktop のセットアップ

ツールと VSCode のエクステンションをインストールします。

```
brew install --cask docker
```

[VSCode の docker エクステンション](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)


## hadolint のセットアップ

ツールと VSCode のエクステンションをインストールします。

```
brew install hadolint
```

[VSCode の hadolint エクステンション](https://marketplace.visualstudio.com/items?itemName=exiasr.hadolint)
