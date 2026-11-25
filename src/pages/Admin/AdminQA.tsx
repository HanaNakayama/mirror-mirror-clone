
import { useState } from "react";
import { SelectedButton } from "../../components/component/component/Button";

type QAItem = {
  id?: number;
  question: string;
  answer: string;
  displayOrder?: number;
  isPublished: number;
};

export default function AdminQA() {
  const [data, setData] = useState<QAItem[]>([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Q&A取得
  const getQA = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/qa", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTPエラー: ${response.status} ${errorText}`);
      }

      const result = await response.json();

      setData(result.qa);
      setLoaded(true);

    } catch (error) {
      setError(
        error instanceof Error ? error.message : "取得に失敗しました"
      );
    } finally {
      setLoading(false);
    }
  };

  // 質問・回答の変更
  const updateQA = (
    index: number,
    field: "question" | "answer" | "isPublished",
    value: string | number
  ) => {
    const newData = [...data];

    newData[index] = {
      ...newData[index],
      [field]: value,
    };

    setData(newData);
  };

  // Q&A追加
  const addQA = () => {
    setData([
      ...data,
      {
        question: "",
        answer: "",
        isPublished: 1,
      },
    ]);
  };

  // Q&A削除
  const deleteQA = (index: number) => {
    if (!window.confirm("このQ&Aを削除しますか？")) return;

    setData(data.filter((_, i) => i !== index));
  };

  // 表示順変更
  const moveQA = (index: number, direction: number) => {
    const newData = [...data];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= data.length) return;

    [newData[index], newData[targetIndex]] = [
      newData[targetIndex],
      newData[index],
    ];

    setData(newData);
  };

  // Q&A保存
  const saveQA = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/qa", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTPエラー: ${response.status} ${errorText}`);
      }

      alert("Q&Aを保存しました");

      // 保存後に最新データを取得
      await getQA();

    } catch (error) {
      setError(
        error instanceof Error ? error.message : "保存に失敗しました"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 text-gray-800">

      <h1 className="text-3xl font-bold mb-8">
        Q&A管理画面
      </h1>

      {/* 管理者認証 */}
      <div className="flex gap-3 mb-8">
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="管理者トークン"
          className="border border-gray-300 bg-white p-3 w-80"
        />

        <SelectedButton
          title={loading ? "取得中..." : "Q&Aを取得"}
          onClick={getQA}
          disabled={loading || !token}
        />
      </div>

      {error && (
        <p className="text-red-500 mb-5">
          {error}
        </p>
      )}

      {/* Q&A一覧 */}
      {loaded && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">
              Q&A一覧（{data.length}件）
            </h2>

            <button
              onClick={addQA}
              disabled={loading}
              className="bg-gray-800 text-white px-5 py-3 hover:bg-gray-600"
            >
              ＋ Q&Aを追加
            </button>
          </div>

          <div className="space-y-5">
            {data.map((item, index) => (
              <div
                key={item.id ?? `new-${index}`}
                className="bg-white border border-gray-200 p-6"
              >
                <div className="flex justify-between items-center mb-5">

                  <h3 className="font-bold">
                    Q&A {index + 1}
                  </h3>

                  <div className="flex items-center gap-4">

                    {/* 表示順変更 */}
                    <button
                      onClick={() => moveQA(index, -1)}
                      disabled={index === 0 || loading}
                      className="text-gray-500 disabled:opacity-30"
                    >
                      ↑
                    </button>

                    <button
                      onClick={() => moveQA(index, 1)}
                      disabled={index === data.length - 1 || loading}
                      className="text-gray-500 disabled:opacity-30"
                    >
                      ↓
                    </button>

                    {/* 削除 */}
                    <button
                      onClick={() => deleteQA(index)}
                      disabled={loading}
                      className="text-red-500 text-sm"
                    >
                      削除
                    </button>

                  </div>
                </div>

                {/* 質問 */}
                <label className="block text-sm font-bold mb-2">
                  質問
                </label>

                <input
                  type="text"
                  value={item.question}
                  onChange={(e) =>
                    updateQA(index, "question", e.target.value)
                  }
                  placeholder="質問を入力してください"
                  className="w-full border border-gray-300 p-3 mb-5"
                  disabled={loading}
                />

                {/* 回答 */}
                <label className="block text-sm font-bold mb-2">
                  回答
                </label>

                <textarea
                  value={item.answer}
                  onChange={(e) =>
                    updateQA(index, "answer", e.target.value)
                  }
                  placeholder="回答を入力してください"
                  className="w-full border border-gray-300 p-3 min-h-32 resize-y"
                  disabled={loading}
                />

                {/* 公開設定 */}
                <div className="mt-5 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.isPublished === 1}
                    onChange={(e) =>
                      updateQA(
                        index,
                        "isPublished",
                        e.target.checked ? 1 : 0
                      )
                    }
                    disabled={loading}
                    id={`published-${index}`}
                  />

                  <label
                    htmlFor={`published-${index}`}
                    className="text-sm"
                  >
                    サイトに公開する
                  </label>
                </div>

              </div>
            ))}
          </div>

          {/* 保存 */}
          <div className="mt-8 flex justify-end">
            <SelectedButton
              title={loading ? "保存中..." : "変更を保存"}
              onClick={saveQA}
              disabled={loading}
            />
          </div>
        </>
      )}

    </div>
  );
}
