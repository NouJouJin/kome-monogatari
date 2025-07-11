# kome-monogatari
「商品に添える『物語』を自動で紡ぐ」  開発秘話、その年の天候、生産者の想いなどを箇条書きで入力するだけで、Webサイトやパンフレットに使える感動的なストーリー記事を生成します。

# 米ものがたりジェネレーター

ブランド米に添える「物語」をAIが自動で紡ぐ、動的なランディングページです。

## ✨ Vibe Coding活用テーマ
「商品に添える『物語』を自動で紡ぐ」

開発秘話、その年の天候、生産者の想いなどを箇条書きで入力するだけで、Webサイトやパンフレットに使える感動的なストーリー記事を生成します。

## 🚀 使い方（デプロイ方法）

### 準備
1.  このリポジトリを自身のGitHubアカウントにフォークまたはクローンします。
2.  [OpenAI](https://platform.openai.com/)でアカウントを作成し、APIキーを取得します。
3.  [Vercel](https://vercel.com/)にGitHubアカウントでサインアップします。

### ローカルでの開発
1.  `npm install` を実行します。
2.  プロジェクトのルートに `.env` ファイルを作成し、以下を記述します。
    ```
    OPENAI_API_KEY="sk-..."
    ```
3.  Vercel CLIをインストールします (`npm i -g vercel`)。
4.  `vercel dev` コマンドを実行して、ローカルサーバーを起動します。

### Vercelへのデプロイ
1.  Vercelのダッシュボードで「Add New... > Project」を選択します。
2.  自身のGitHubリポジトリをインポートします。
3.  **Environment Variables** の設定画面で、以下の環境変数を追加します。
    -   **Name**: `OPENAI_API_KEY`
    -   **Value**: (あなたのOpenAI APIキー)
4.  「Deploy」ボタンをクリックします。デプロイが完了すると、公開URLが発行されます。
