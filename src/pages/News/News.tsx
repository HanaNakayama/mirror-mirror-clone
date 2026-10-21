
import Header from "../../components/Header";

const news = [
  {
    image: "/news1.webp",
    category: "MEDIA",
    title: "ウェディング雑誌に掲載されました",
    date: "2026.10.01",
  },
  {
    image: "/news2.webp",
    category: "NEWS",
    title: "MIRROR MIRRORからのお知らせ",
    date: "2026.09.25",
  },
  {
    image: "/news3.png",
    category: "MEDIA",
    title: "新しいドレスコレクションのご紹介",
    date: "2026.09.20",
  },
  {
    image: "/news4.webp",
    category: "NEWS",
    title: "オリジナルドレスについて",
    date: "2026.09.15",
  },
  {
    image: "/news5.webp",
    category: "MEDIA",
    title: "雑誌掲載のお知らせ",
    date: "2026.09.10",
  },
  {
    image: "/news6.webp",
    category: "NEWS",
    title: "新作ドレスが入荷しました",
    date: "2026.09.01",
  }
];

export default function News() {
  return (
    <>
      <Header />

      <main className="w-full bg-white text-black pb-24">

        <h1 className="mt-35 mb-16 text-center font-['Didot'] text-5xl font-normal">
          NEWS
        </h1>

        <div className="w-2/3 max-w-5xl mx-auto grid grid-cols-3 gap-5 items-start">

          {news.map((item, index) => (
            <div
              key={index}
              className="bg-stone-100"
            >

              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">

                <p className="text-xs text-blue-800">
                  {item.category}
                </p>

                <h2 className="mt-3 text-sm leading-relaxed">
                  {item.title}
                </h2>

                <p className="mt-5 text-xs text-gray-400">
                  {item.date}
                </p>

              </div>

            </div>
          ))}

        </div>

      </main>
    </>
  );
}
