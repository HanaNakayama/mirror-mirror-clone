
import Header from "../../components/Header";

const questions = [
  {
    question: "来店予約は必要ですか？",
    answer:
      "ごゆっくりとご試着頂くため、当店は完全予約制とさせていただいております。ご予約はWEBサイトメニュー内「Reservation」よりお申込み頂けます。",
  },
  {
    question: "どこの店舗でも予約していいですか？",
    answer:
      "提携会場のお客様は、会場によってご案内する店舗が決まっておりますので、会場にお問い合わせください。また、提携会場以外で挙式のお客様は、現在丸の内店でのみご予約を承っております。",
  },
  {
    question: "挙式日のどのくらい前に試着に伺えばいいですか？",
    answer:
      "提携会場のお客様につきましては会場により6～8か月前から、提携会場以外のお客様は6か月前からのご来店を承っております。 ご事情がありお急ぎの場合には直接お問合せください。",
  },
  {
    question: "会場や式日が未定ですがドレスの試着はできますか？",
    answer:
      "レンタルの場合、ご試着するドレスがお貸出しできるかのご案内ができかねるため、未定のお客様はお断りしております。 購入のお客様は直接お問い合わせください。",
  },
  {
    question: "パートナー／両親にもドレス試着を見てもらいたいから一緒に来店してもいいですか？",
    answer:
      "もちろん大丈夫です。 ただし待合スペースに限りがございますので、ご同伴者様は2名までとさせていただいております。 なお、初回はドレスのみのご試着となります。 タキシード試着、ご両親様のご試着は別途ご案内しておりますのでご了承ください。",
  },
];

export default function QA() {
  return (
    <>
      <Header />

      <main className="mt-35 w-full bg-white text-black pb-24">

        <h1 className="mb-16 text-center font-['Didot'] text-5xl font-normal leading-normal tracking-wide">
          Q &amp; A
        </h1>

        <div className="w-2/3 max-w-5xl mx-auto">

          {questions.map((item, index) => (
            <div
              key={item.question}
              className={`px-16 py-12 ${index % 2 === 0
                ? "bg-stone-100"
                : "bg-stone-200"
                }`}
            >

              <div className="flex items-start">
                <span className="font-['Didot'] text-5xl leading-none w-20 shrink-0">
                  Q.
                </span>

                <p className="flex-1 mt-4 ml-6 text-sm leading-loose">
                  {item.question}
                </p>
              </div>

              <div className="mt-12 flex items-start">
                <span className="font-['Didot'] text-5xl leading-none w-20 shrink-0">
                  a.
                </span>

                <p className="flex-1 mt-1 ml-6 text-sm leading-loose">
                  {item.answer}
                </p>
              </div>

            </div>
          ))}

        </div>

      </main>
    </>
  );
}
