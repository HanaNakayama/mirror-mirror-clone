import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MustQuestion } from "./Question";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const heights = Array.from({ length: 71 }, (_, i) => i + 130);
const footsize = Array.from({ length: 10 }, (_, i) => i + 21);

export const InputForm = () => {

  const location = useLocation();
  const place = location.state?.place;

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {

    console.log(data);

  };


  return (

    <>
      <Link to="/"><div className="flex justify-center items-center pt-8"><img className="h-5" src="/logo.png"></img></div></Link>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="w-200 mx-100 my-30">
          <label className="text-left px-5 font-serif text-3xl ">お客様情報入力</label><br /><br />
          <label className="text-left px-5 font-serif text-xl pt-10">挙式情報</label><hr className="py-4" />
          <div className="flex items-center">
            <MustQuestion question={"挙式予定日"}></MustQuestion>
            <div className="px-2">
              <select className="border px-4" {...register("year", { required: "年を入力してください" })} name="year">
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>

            <div className="px-2">
              <select className="border px-4" {...register("month", { required: "月を入力してください" })} name="month"> {months.map((month) => {
                return (<option key={month} value={month}>{month}</option>);
              })} </select>
            </div>

            <div className="px-2">
              <select className="border px-4" {...register("day", { required: "日を入力してください" })} name="day"> {days.map((day) => {
                return (<option key={day} value={day}>{day}</option>);
              })} </select>
            </div>
          </div>
          <br />

          <div className="flex items-center">
            <MustQuestion question={"挙式会場"}></MustQuestion>
            <input className="h-10 w-80 border m-2" defaultValue={place} {...register("ceremonyPlace")} />
          </div>
          <br />

          <div className="flex items-center">
            <MustQuestion question={"披露宴会場"}></MustQuestion>
            <input className="h-10 w-80 border m-2" defaultValue={place} {...register("partyPlace")} />
          </div>
          <br />

          <label className="text-left px-5 font-serif text-xl pt-10">ご新婦様情報</label><hr className="py-4" />

          <div className="flex items-center">
            <MustQuestion question={"ご新婦様お名前（旧姓）"}></MustQuestion>
            <input className="h-10 w-40 border m-2" defaultValue="姓(旧姓)" {...register("lastName")} />
            <input className="h-10 w-40 border m-2" defaultValue="名" {...register("firstName")} />
          </div>
          <br />

          <div className="flex items-center">
            <MustQuestion question={"ご新婦様ふりがな（旧姓）"}></MustQuestion>
            <input className="h-10 w-40 border m-2" defaultValue="せい" {...register("lastNameFurigana")} />
            <input className="h-10 w-40 border m-2" defaultValue="めい" {...register("firstNameFurigana")} />
          </div>
          <br />

          <div className="flex items-center">
            <MustQuestion question={"生年月日"}></MustQuestion>
            <div className="px-2">
              <select className="border px-4" {...register("birthYear", { required: "生年月日を入力してください" })}>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>

            <div className="px-2">
              <select className="border px-4" {...register("birthMonth", { required: "生年月日を入力してください" })}> {months.map((month) => {
                return (<option key={month} value={month}>{month}</option>);
              })} </select>
            </div>

            <div className="px-2">
              <select className="border px-4" {...register("birthDay", { required: "生年月日を入力してください" })}> {days.map((day) => {
                return (<option key={day} value={day}>{day}</option>);
              })} </select>
            </div>
          </div>
          <br />

          <div className="flex items-center">
            <MustQuestion question={"身長"} />
            <div className="px-2">
              <select className="border px-4" {...register("height", { required: "身長を入力してください" })} >
                <option value="">選択してください</option>
                {heights.map((height) => {
                  return (<option key={height} value={height}> {height}cm
                  </option>);
                })}
              </select>
            </div>
          </div>
          <br />

          <div className="flex items-center">
            <MustQuestion question={"号数"}></MustQuestion>
            <div className="px-2">
              <select className="border px-4" {...register("size", { required: "号数を入力してください" })} name="year">
                <option value="S">S（７号）</option>
                <option value="M">M（９号）</option>
                <option value="L">L（１１号）</option>
              </select>
            </div>
          </div>
          <br />

          <div className="flex items-center">
            <MustQuestion question={"靴のサイズ"} />
            <div className="px-2">
              <select className="border px-4" {...register("footsize", { required: "靴のサイズを入力してください" })} >
                <option value="">選択してください</option>
                {footsize.map((size) => { return (<option key={size} value={size}> {size}cm </option>); })}
              </select>
            </div>
          </div>
          <br />

          <div className="flex items-center">
            <MustQuestion question={"メールアドレス"} />
            <input type="email" className="h-10 w-80 border m-2 px-2" placeholder="example@example.com" {...register("email",
              {
                required: "メールアドレスを入力してください", pattern:
                  { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "正しいメールアドレスを入力してください" }
              })} />
          </div>
          <br />

          <div className="flex items-center">
            <MustQuestion question={"携帯電話番号"} />
            <input type="tel" className="h-10 w-80 border m-2 px-2" placeholder="09012345678"
              {...register("phone", {
                required: "携帯電話番号を入力してください", pattern: {
                  value: /^0\d{9,10}$/, message: "正しい電話番号を入力してください"
                }
              })} />
          </div>
          <br />

          <label className="text-left px-5 font-serif text-xl pt-10">
            ご新郎様情報
          </label>
          <hr className="py-4" />

          <div className="flex items-center">
            <MustQuestion question={"ご新郎様お名前（旧姓）"} />
            <input
              type="text"
              className="h-10 w-40 border m-2"
              placeholder="姓"
              {...register("groomLastName", {
                required: "姓を入力してください"
              })}
            />
            <input
              type="text"
              className="h-10 w-40 border m-2"
              placeholder="名"
              {...register("groomFirstName", {
                required: "名を入力してください"
              })}
            />
          </div>
          <br />

          <div className="flex items-center">
            <MustQuestion question={"ご新郎様ふりがな（旧姓）"} />
            <input
              type="text"
              className="h-10 w-40 border m-2"
              placeholder="せい"
              {...register("groomLastNameFurigana", {
                required: "姓のふりがなを入力してください",
                pattern: {
                  value: /^[ぁ-ゖー]+$/,
                  message: "ひらがなで入力してください"
                }
              })}
            />
            <input
              type="text"
              className="h-10 w-40 border m-2"
              placeholder="めい"
              {...register("groomFirstNameFurigana", {
                required: "名のふりがなを入力してください",
                pattern: {
                  value: /^[ぁ-ゖー]+$/,
                  message: "ひらがなで入力してください"
                }
              })}
            />
          </div>
          <br />

          <label className="text-left px-5 font-serif text-xl pt-10">
            ご試着店舗
          </label>
          <div className="flex">
            <img src="/shop1.png" className="w-80 h-60" />
            <div>
              <p>挙式会場がフォーシーズンズホテル東京大手町のお客様は</p><br />
              <p>丸の内店</p><br />
              <p>にご来店ください。</p>
            </div>
          </div>
          <br />



          <button className="text-white bg-[#233B6C] h-15 w-70 rounded-xl" onClick={onSubmit}>
            確認画面へ
          </button>
        </div>

      </form></>

  );
};