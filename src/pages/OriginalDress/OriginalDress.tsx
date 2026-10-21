
import Header from '../../components/Header';
import './OriginalDress.css';
import { useState, useEffect, useRef } from 'react';

export default function OriginalDress() {
  const [isColor, setIsColor] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const dressRef = useRef(null);
  const dressRef2 = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (dressRef.current) {
        const rect = dressRef.current.getBoundingClientRect();

        // 画像がヘッダーの下に来てから縮小開始
        const scrollAmount = 96 - rect.top;

        // 400pxスクロールする間に縮小
        const value = Math.min(
          Math.max(scrollAmount / 400, 0),
          1
        );

        setProgress(value);
      }

      // 2つ目のスクロール演出
      if (dressRef2.current) {
        const rect2 = dressRef2.current.getBoundingClientRect();
        const scrollAmount2 = 96 - rect2.top;

        const value2 = Math.min(
          Math.max(scrollAmount2 / 400, 0),
          1
        );

        setProgress2(value2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="main">
        <img src="originalDress.png"></img>
      </div>
      <div className='title'>
        <img
          src="OriginalDressTitle.svg" />
      </div>
      <div className='concept' />
      <p>「こんなドレスがあったらいいのに・・・。」そんな花嫁たちの心の声に応える<br />
        オリジナルドレスは、日々花嫁と向き合うドレスコーディネーターと、<br />
        海外のトレンドを知り尽くすデザイナーが<br />
        創りあげるMIRROR MIRRORの特別なオリジナルライン。<br />
      </p>
      <p>
        日本人の体型を意識しスタイルアップできるよう計算し尽くしたデザイン。<br />
        そして細かいディテールにこだわることで実現した着心地の良いドレスが揃います。
      </p><h1 className="originalDressHeading">ORIGINAL DRESS</h1>
      <div className='dressButtons'>
        <button onClick={() => setIsColor(true)}
          style={{ color: isColor ? 'black' : 'gray' }}

          disabled={isColor} >Color Dress</button>
        <button onClick={() => setIsColor(false)}
          style={{ color: isColor ? 'gray' : 'black' }}
          disabled={!isColor}>White Dress</button>
      </div >

      {/* 1つ目のスクロール演出 */}
      <div ref={dressRef} className="relative">

        {/* 画像を右側に固定 */}
        <div className="sticky top-24 h-[calc(100vh-96px)]">

          <img
            src={isColor ? 'colordress1.png' : 'whitedress1.png'}
            className="absolute top-0 right-0 h-full object-cover"
            style={{
              width: `${100 - progress * 50}%`,
              objectPosition: 'center',
            }}
          />

        </div>

        {/* 左側のコンテンツ */}
        <div
          className="relative w-1/2 -mt-[calc(100vh-96px)] pt-[400px] bg-transparent"
          style={{
            visibility: progress >= 1 ? 'visible' : 'hidden',
          }}
        >

          {/* 説明文 */}
          <div className="px-16 pt-24 pb-24 bg-white">

            <h2 className="font-['Didot'] text-5xl mb-8 text-left">
              {isColor ? 'PASTEL' : 'WHITE'}
            </h2>

            <p className="text-left leading-loose">
              {isColor
                ? '淡く柔らかな色彩が、上品で優しい印象を演出するカラーパレット。特別な一日を迎える主役を飛び切りハッピーなオーラで包み込みます。シンプルなワンカラーのドレスには、ボリュームのあるアクセサリーやスタイリングで華やかさを取り入れて。'
                : '“大人×cute”や“スパイス×sweet”など異なるテイストを絶妙にミックスしたMIRROR MIRRORのオリジナルドレス。'}
            </p>

          </div>

          {/* ドレス画像一覧 */}
          <div className="flex gap-4 px-5 pb-16 bg-white">

            <img
              src={isColor ? 'colordress2.webp' : 'whitedress2.webp'}
              className="w-1/2 object-cover"
            />

            <img
              src={isColor ? 'colordress3.webp' : 'whitedress3.webp'}
              className="w-1/2 object-cover"
            />

          </div>

          {/* 続きのドレス画像 */}
          <div className="flex gap-4 px-5 pb-24 bg-white">

            <img
              src={isColor ? 'colordress4.webp' : 'whitedress4.webp'}
              className="w-1/2 object-cover"
            />

            <img
              src={isColor ? 'colordress5.webp' : 'whitedress5.webp'}
              className="w-1/2 object-cover"
            />

          </div>

          <div className="h-96 bg-white"></div>

        </div>

      </div>

      {/* カラードレスのときだけ2つ目のスクロール演出 */}
      {isColor && (
        <div ref={dressRef2} className="relative">

          {/* 画像を左側に固定 */}
          <div className="sticky top-24 h-[calc(100vh-96px)]">

            <img
              src="colordress10.png"
              className="absolute top-0 left-0 h-full object-cover"
              style={{
                width: `${100 - progress2 * 50}%`,
                objectPosition: 'center',
              }}
            />

          </div>

          {/* 右側のコンテンツ */}
          <div
            className="relative w-1/2 ml-auto -mt-[calc(100vh-96px)] pt-[400px] bg-transparent"
            style={{
              visibility: progress2 >= 1 ? 'visible' : 'hidden',
            }}
          >

            {/* 説明文 */}
            <div className="px-16 pt-24 pb-24 bg-white">

              <h2 className="font-['Didot'] text-5xl mb-8 text-left">
                COLOR
              </h2>

              <p className="text-left leading-loose">
                色の掛け合わせや巧みな素材使いなど細部までこだわることで旬なバランスを叶えるニュアンスドレス。
                柔らかで優しい印象を醸しつつも、ナチュラルすぎない、自分色に染められる余白を残したデザインが魅力。
              </p>

            </div>

            {/* ドレス画像1・2 */}
            <div className="flex gap-4 px-5 pb-16 bg-white">

              <img
                src="colordress11.webp"
                className="w-1/2 object-cover"
              />

              <img
                src="colordress12.webp"
                className="w-1/2 object-cover"
              />

            </div>

            {/* ドレス画像3・4 */}
            <div className="flex gap-4 px-5 pb-24 bg-white">

              <img
                src="colordress13.webp"
                className="w-1/2 object-cover"
              />

              <img
                src="colordress14.webp"
                className="w-1/2 object-cover"
              />

            </div>

            <div className="h-96 bg-white"></div>

          </div>

        </div>
      )}
    </>
  );
}
