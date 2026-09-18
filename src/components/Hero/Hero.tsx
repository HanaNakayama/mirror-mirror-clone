import './Hero.css'
import { Footer } from '../Footer';
import Header from '../Header';

export default function Hero() {
  return (
    <>
      <Header />
      <div className='slider'>
        <ul className="slider-inner">
          <li><img src={"top.webp"} /></li>
          <li><img src={"top2.webp"} /></li>
          <li><img src={"top3.webp"} /></li>
          <li><img src={"top.webp"} /></li>
        </ul>
      </div>

      <div className="image-container1">
        <div className="image-item1">
          <img src={"dressviewmore.png"} />
        </div>
        <div className="image-item1">
          <img src={"aboutviewmore.png"} />
        </div>
      </div>
      <h1>SHOP</h1>
      <div className="image-container2">
        <div className="image-item2">
          <img src={"shop1.png"} />
        </div>
        <div className="image-item2">
          <img src={"shop2.png"} />
        </div>
        <div className="image-item2">
          <img src={"shop3.png"} />
        </div>
      </div>
      <button className='viewmore'>VIEW MORE</button>
      <h1>NEWS</h1>
      <div className='news'>
        <div>
          <div className='column'>
            <div>
              <img src='media1.webp'></img>
            </div>
            <div>
              <h2>MEDIA</h2>
              <h3>Press Update</h3>
              <p>『25ans Wedding <br />
                DIGITAL』（6月10日公開）<br />
                に掲載されました。<br />
                2026/06/30
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className='column'>
            <div>
              <img src='media1.webp'></img>
            </div>
            <div>
              <h2>MEDIA</h2>
              <h3>Press Update</h3>
              <p>『25ans Wedding <br />
                DIGITAL』（6月10日公開）<br />
                に掲載されました。<br />
                2026/06/30
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2>MEDIA</h2>
          <h3>Press Update</h3>
          <p>『25ans Wedding <br />
            DIGITAL』（6月10日公開）<br />
            に掲載されました。<br />
            2026/06/30
          </p>
        </div>
      </div>
      <button className='viewmore'>VIEW MORE</button>
      <div className="banner">
        <img src={"banner.png"}></img>
      </div>
      <Footer></Footer>
    </>
  );
}