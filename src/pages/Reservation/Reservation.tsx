import { Button } from "../../components/component/component/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Reservation() {
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