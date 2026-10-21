
import Header from '../../components/Header';
import './Tuxedo.css';
import { useState, useEffect, useRef } from 'react';

export default function Tuxedo() {
  const [progress, setProgress] = useState(0);
  const tuxedoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!tuxedoRef.current) return;

      const rect = tuxedoRef.current.getBoundingClientRect();

      // 画像がヘッダーの下に来てから縮小開始
      const scrollAmount = 96 - rect.top;

      // 400pxスクロールする間に縮小
      const value = Math.min(
        Math.max(scrollAmount / 400, 0),
        1
      );

      setProgress(value);
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

      {/* タイトル */}
      <div className="text-center py-24">
        <h1 className="font-['Didot'] text-5xl">
          TUXEDO
        </h1>
      </div>

      {/* スクロール演出 */}
      <div ref={tuxedoRef} className="relative">

        {/* 画像を右側に固定 */}
        <div className="sticky top-24 h-[calc(100vh-96px)]">

          <img
            src="/Tuxedomain.png"
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
              TRADITIONAL
            </h2>

            <p className="text-left leading-loose">
              時代や流行に捉われず、その国の文化や伝統を受け継ぎ発展してきた、もっとも格式高いドレスコード“トラディショナル・スタイル”。
              仕立ての良さや生地のクオリティにこだわり、品格のある装いを叶える特別なコレクションに。
            </p>

          </div>

          {/* タキシード画像1・2 */}
          <div className="flex gap-4 px-5 pb-16 bg-white">

            <img
              src="/Tuxedo2.webp"
              className="w-1/2 object-cover"
            />

            <img
              src="/Tuxedo3.webp"
              className="w-1/2 object-cover"
            />

          </div>

          {/* タキシード画像3・4 */}
          <div className="flex gap-4 px-5 pb-24 bg-white">

            <img
              src="/Tuxedo4.webp"
              className="w-1/2 object-cover"
            />

            <img
              src="/Tuxedo5.webp"
              className="w-1/2 object-cover"
            />

          </div>

          <div className="h-96 bg-white"></div>

        </div>

      </div>
    </>
  );
}