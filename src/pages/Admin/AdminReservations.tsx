import { useState } from "react";
import { SelectedButton } from "../../components/component/component/Button";

export default function AdminReservations() {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const getReservations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/reservations", {
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

      console.log("取得した予約情報:", result);
      setData(result);

    } catch (error) {
      setError(
        error instanceof Error ? error.message : "取得に失敗しました"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        予約管理画面
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="管理者トークン"
          className="border p-2"
        />

        <SelectedButton
          title={loading ? "取得中..." : "予約情報を取得"}
          onClick={getReservations}
          disabled={loading || !token}
        />
      </div>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {data !== null && (
        <pre className="bg-gray-100 p-5 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}