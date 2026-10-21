import { useState } from "react";
import { Button } from "../../components/component/component/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Reservation() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const handleCustomerInfo = () => {
    navigate("CustomerInfo/CustomerInfo")
  }
  const handleNoPartnership = () => {
    navigate("CustomerInfo/NoPartnership")
  }

  const handleAppoint = () => {
    navigate("Appoint")
  }
  return (
    <>
      {/* モーダル：ここから追加 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">

            <h2 className="mb-6 text-center font-serif text-2xl">
              ご案内
            </h2>

            <p className="mb-8 text-left text-sm leading-8">
              ご試着のご希望ありがとうございます。
              このページでは
              <strong>ご新婦様の初回来店予約のみ</strong>
              受け付けております。
              ２回目以降のご予約や、ご新郎様・ご列席者様の試着予約は、
              店舗に直接お問い合わせください。
            </p>

            <div className="mb-5 flex justify-center">
              <Button
                title={"OK"}
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <div className="text-center">
              <Link to="/">
                サイトTOPへ戻る
              </Link>
            </div>

          </div>
        </div>
      )}
      {/* モーダル：ここまで*/}

      <Link to="/"><div className="flex justify-center items-center pt-8"><img className="h-5" src="logo.png"></img></div></Link>
      <p className="font-serif text-3xl pt-40">来店予約</p>
      <p className="pt-10 text-sm">まずはじめに衣装のご使用予定会場についてお聞かせください</p>
      <p className="pt-10 font-serif text-xl">衣装ご使用会場はMIRROR MIRRORとの提携はございますか？</p>

      <div className="flex justify-center items-center gap-5 pt-4">
        <Button title={"提携あり"} onClick={handleCustomerInfo}></Button>
        <Button onClick={handleNoPartnership} title={"提携なし"}></Button>
      </div>
      <p className="font-serif text-3xl pt-20">ドレスコーディネーター指名</p>
      <p className="pt-10 font-serif text-xl">担当ドレスコーディネーターを指名いただくことも可能です</p>
      <div className="flex justify-center items-center pt-4">
        <Button onClick={handleAppoint} title={"指名サービスページへ"}></Button>
      </div >
    </>
  );
};