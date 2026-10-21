import Header from "../../components/Header";

const shops = [
  {
    name: "丸の内",
    english: "MARUNOUCHI",
    image: "/shop1.webp",
    description: "提携会場以外のお客様は丸の内店でのご案内となります",
  },
  {
    name: "表参道",
    english: "OMOTESANDO",
    image: "/shop2.webp",
    description: "",
  },
  {
    name: "横浜",
    english: "YOKOHAMA",
    image: "/shop3.webp",
    description: "",
  },
  {
    name: "千葉",
    english: "CHIBA",
    image: "/shop4.webp",
    description: "",
  },
];

export default function Shop() {
  return (
    <>
      <Header />

      <main className="w-full bg-white text-black pb-24">

        <h1 className="mt-35 mb-16 text-center font-['Didot'] text-5xl">
          SHOP
        </h1>

        <div className="w-2/3 mx-auto grid grid-cols-3 gap-6">

          {shops.map((shop) => (
            <div key={shop.name} className="text-center">

              <div className="w-full h-52 overflow-hidden">
                <img
                  src={shop.image}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <h2 className="mt-4 text-2xl font-serif">
                {shop.name}
              </h2>

              <p className="font-['Didot'] text-base">
                {shop.english}
              </p>

              <p className="mt-4 text-sm">
                {shop.description}
              </p>

            </div>
          ))}

        </div>

      </main>
    </>
  );
}