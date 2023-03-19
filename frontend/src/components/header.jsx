import { Link } from "react-router-dom";
import React from "react";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Kirjokallionkuja 5
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle active"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menot
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/menot" className="dropdown-item" href="#">
                    Laskut
                  </Link>
                </li>
                <li>
                  <Link to="/menoluokat" className="dropdown-item" href="#">
                    Menot luokittain
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/tulot">
                Tulot
              </Link>
            </li>
            {/* WIP: login/logout */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-regular fa-user"></i>
              </a>
              <ul className="dropdown-menu" style={{ left: -50 }}>
                <li>
                  <Link
                    to="/customer/register"
                    className="dropdown-item"
                    href="#"
                  >
                    Omat tiedot
                  </Link>
                </li>
                <li>
                  <Link to="/customer/login" className="dropdown-item" href="#">
                    Kirjaudu
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
