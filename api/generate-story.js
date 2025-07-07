// OpenAIのライブラリをインポート
import OpenAI from 'openai';

// OpenAIクライアントを初期化
// APIキーはVercelの環境変数から安全に読み込む
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Vercelがこの関数をAPIエンドポイントとして実行する
export default async function handler(request, response) {
  // POSTリクエスト以外は拒否
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // フロントエンドから送られてきた情報を取得
    const { devStory, weather, passion } = request.body;

    // AIへの指示（プロンプト）を組み立てる
    const prompt = `
あなたは、食と物語を紡ぐプロのコピーライターです。
以下の断片的な情報から、読者の心を動かす感動的な「お米の物語」を生成してください。
物語はWebサイトやパンフレットでそのまま使えるような、格調高く、美しい文章でお願いします。
必ず、魅力的なタイトルから始めてください。

# 情報
- 開発秘話: ${devStory}
- その年の天候や風土: ${weather}
- 生産者の想い: ${passion}

# 生成する物語
`;

    // OpenAI APIを呼び出し
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // 最新の高性能モデル (または 'gpt-3.5-turbo')
      messages: [
        {
          role: 'system',
          content: 'あなたは、食と物語を紡ぐプロのコピーライターです。読者の心を動かす、感動的な文章を生成するのが得意です。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7, // 少し創造性を持たせる
      max_tokens: 800,
    });

    // 生成された物語をフロントエンドに返す
    const story = completion.choices[0].message.content;
    response.status(200).json({ story });

  } catch (error) {
    console.error('Error generating story:', error);
    response.status(500).json({ error: '物語の生成に失敗しました。' });
  }
}