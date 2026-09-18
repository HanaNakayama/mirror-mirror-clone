import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="header">

      {/* ロゴ */}
      <Link to="/" className="logo">
        <img src="/logo.png" alt="MIRROR MIRROR" />
      </Link>


      {/* ナビゲーション */}
      <nav className="nav">
        <ul className="nav-list">

          {/* Dress */}
          <li
            className="dropdown"
            onMouseEnter={() => setOpenMenu("dress")}
          >
            <span className="nav-item">
              Dress ∨
            </span>


            {/* Dress サブメニュー */}
            {openMenu === "dress" && (
              <ul
                className="submenu"
                onMouseLeave={() => setOpenMenu(null)}
              >

                <li>
                  <Link to="/dress/import">
                    Import Brand
                  </Link>
                </li>

                <li>
                  <Link to="/original-dress">
                    Original Dress
                  </Link>
                </li>

                <li>
                  <Link to="/dress/kimono">
                    Kimono
                  </Link>
                </li>

                <li>
                  <Link to="/dress/mens">
                    Mens
                  </Link>
                </li>

                <li>
                  <Link to="/dress/parents">
                    For Parents
                  </Link>
                </li>

              </ul>

            )}
          </li>


          {/* Anniversary */}
          <li className="nav-item">
            Anniversary ∨
          </li>


          {/* Sustainable */}
          <li className="nav-item">
            Sustainable ∨
          </li>


          {/* About */}
          <li className="nav-item">
            About ∨
          </li>


          {/* Shop */}
          <li className="nav-item">
            Shop ∨
          </li>


          {/* Q&A */}
          <li className="nav-item">
            Q&A
          </li>


          {/* News */}
          <li className="nav-item">
            News
          </li>


          {/* Recruit */}
          <li className="nav-item">
            Recruit
          </li>


          {/* English */}
          <li className="nav-item">
            English
          </li>


          {/* Reservation */}
          <li className="nav-item">
            <Link to="/Reservation">
              Reservation
            </Link>
          </li>

        </ul>
      </nav>

    </header>
  );
}