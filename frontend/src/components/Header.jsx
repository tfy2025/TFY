import React, { useState, useEffect } from "react";
import { FaGlobe, FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Menu from "./Menu";
import '../assets/css/Header.css';
import '../lang.jsx';

const Header = ({ fullpageApi }) => {
  const { i18n } = useTranslation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <nav className="navbar fixed-top px-4 py-2 d-flex justify-content-between align-items-center shadow-sm">
        {/* Nút mở menu trái */}
        <button
          className="btn btn-outline-dark"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasMenu"
          aria-controls="offcanvasMenu"
        >
          <FaBars className="me-1" />
          Menu
        </button>

        {/* Logo giữa */}
        <a className="navbar-brand mx-auto" href="/">
          <img
            src="/logo.png"
            alt="TFY Logo"
            height="40"
            style={{ objectFit: "contain" }}
          />
        </a>

        {/* Ngôn ngữ + Tên người dùng + Đăng xuất */}
        <div className="d-flex align-items-center gap-3">
          {userName && (
            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold text-dark">👋 {userName}</span>
              <button
                onClick={() => {
                  localStorage.removeItem("userName");
                  localStorage.removeItem("role");
                  window.location.reload();
                }}
                className="btn btn-outline-danger btn-sm"
              >
                Đăng xuất
              </button>
            </div>
          )}

          <div className="dropdown">
            <button
              className="btn btn-outline-secondary btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaGlobe className="me-1" />
              {i18n.language.toUpperCase()}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={() => changeLanguage('vi')}>
                  🇻🇳 Tiếng Việt
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => changeLanguage('en')}>
                  🇺🇸 English
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Menu fullpageApi={fullpageApi} />
    </>
  );
};

export default Header;
