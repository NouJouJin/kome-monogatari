document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('story-form');
    const generateBtn = document.getElementById('generate-btn');
    const storyOutput = document.getElementById('story-output');
    const loadingIndicator = document.getElementById('loading');
    const errorOutput = document.getElementById('error-output');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // フォームのデフォルト送信をキャンセル

        // フォームから各要素の値を取得
        const devStory = document.getElementById('dev-story').value;
        const weather = document.getElementById('weather').value;
        const passion = document.getElementById('passion').value;

        // ボタンとUIの状態を更新
        generateBtn.disabled = true;
        generateBtn.textContent = '生成中...';
        storyOutput.classList.add('hidden');
        errorOutput.classList.add('hidden');
        loadingIndicator.classList.remove('hidden');

        try {
            // バックエンドAPIにリクエストを送信
            const response = await fetch('/api/generate-story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ devStory, weather, passion }),
            });

            // レスポンスが正常でない場合はエラーを投げる
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || '不明なエラーが発生しました');
            }

            // レスポンスから物語データを取得
            const data = await response.json();
            
            // 結果を表示
            storyOutput.textContent = data.story;
            storyOutput.classList.remove('hidden');

        } catch (error) {
            // エラーメッセージを表示
            errorOutput.textContent = `エラー: ${error.message}`;
            errorOutput.classList.remove('hidden');
        } finally {
            // UIの状態を元に戻す
            loadingIndicator.classList.add('hidden');
            generateBtn.disabled = false;
            generateBtn.textContent = '物語を生成する';
        }
    });
});