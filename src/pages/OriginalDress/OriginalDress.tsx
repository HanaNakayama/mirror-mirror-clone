import './OriginalDress.css';
import { useState } from 'react';
export default function OriginalDress() {
  const [isColor, setIsColor] = useState(true);
  return (
    <>
      <div className="main">
        <img src="originalDress.png"></img>
      </div>
      <div className='title'>
        <img
          src="OriginalDressTitle.svg" />
      </div>
      <div />
      <p>「こんなドレスがあったらいいのに・・・。」そんな花嫁たちの心の声に応える<br />
        オリジナルドレスは、日々花嫁と向き合うドレスコーディネーターと、<br />
        海外のトレンドを知り尽くすデザイナーが<br />
        創りあげるMIRROR MIRRORの特別なオリジナルライン。<br />
      </p>
      <p>
        日本人の体型を意識しスタイルアップできるよう計算し尽くしたデザイン。<br />
        そして細かいディテールにこだわることで実現した着心地の良いドレスが揃います。
      </p><h1>ORIGINAL DRESS</h1>
      <div className='dressButtons'>
        <button onClick={() => setIsColor(true)}
          style={{ color: isColor ? 'black' : 'gray' }}

          disabled={isColor} >Color Dress</button>
        <button onClick={() => setIsColor(false)}
          style={{ color: isColor ? 'gray' : 'black' }}
          disabled={!isColor}>White Dress</button>
      </div >
      <div className='dress'>
        {isColor ?
          <img src='colordress1.png'></img> :
          <img src='whitedress1.png'></img>}</div>
    </>
  );
}