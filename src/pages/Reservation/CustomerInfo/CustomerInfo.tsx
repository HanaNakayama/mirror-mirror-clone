
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/component/component/Button";
import { useState } from "react";
import { SelectedButton } from "../../../components/component/component/Button";


export const CustomerInfo = () => {
  const navigate = useNavigate();
  const handleInputForm = () => {
    navigate("/Reservation/CustomerInfo/InputForm", {
      state: { place }
    });
  };
  const handleNoPartnership = () => {
    navigate("/Reservation/CustomerInfo/NoPartnership")
  };
  const [select, setSelect] = useState(false);
  const [place, setPlace] = useState("");
  const handleChange = (e) => {
    setPlace(e.target.value);
    console.log(e.target.value)
  };
  return (
    <>
      <Link to="/"><div className="flex justify-center items-center pt-8"><img className="h-5" src="/logo.png"></img></div></Link>
      <p className="font-serif text-3xl pt-10">お客様情報入力</p><p className="pt-10 text-sm">まずはじめに衣装のご使用予定会場についてお聞かせください</p>
      <div className="flex justify-center gap-4">
        <SelectedButton onClick={() => { }} title={"提携あり"}></SelectedButton>
        <Button onClick={handleNoPartnership} title={"提携なし"}></Button>
      </div>
      < div className="mx-50 text-left mr-auto w-fit">
        <p className="pt-10 text-sm font-bold">東京會舘のお客様はこちらからご予約ください</p>
        <p onClick={() => setSelect(!select)} className="pt-10 text-sm cursor-pointer">東京駅周辺　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　∨</p>
        <hr />
        <form>
          <div className="flex justify-start py-4">
            {select ? <><input type="radio" name="place" value="フォーシーズンズホテル東京大手町" onChange={handleChange} required /><label>フォーシーズンズホテル東京大手町</label>
              <input type="radio" name="place" value="東京ステーションホテル" onChange={handleChange} required /><label>東京ステーションホテル</label></> : null}
          </div>
          <div className="flex justify-center gap-4"><button type="button" className="text-white bg-[#233B6C] text-xs border-solid border w-72 h-16 cursor-pointer rounded-xl" onClick={handleInputForm}>お客様情報入力へ</button></div>
        </form>
      </div>

    </>

  );
}