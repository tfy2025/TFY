import React from "react";
import { useTranslation } from "react-i18next";
import { FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";
import '../assets/css/Menu.css';

const Menu = ({ fullpageApi }) => {
  const { t } = useTranslation();

  const handleMenuClick = (sectionIndex) => {
    if (fullpageApi) {
      fullpageApi.moveTo(sectionIndex);
      document.querySelector('.btn-close')?.click();
    }
  };

  return (
    <div
      className="offcanvas offcanvas-start offcanvas-menu-custom"
      tabIndex="-1"
      id="offcanvasMenu"
      aria-labelledby="offcanvasMenuLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasMenuLabel">{t('menu')}</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="list-unstyled">
          <li className="mb-2">
            <button
              className="nav-link w-100 d-flex align-items-center gap-2 py-2 px-3 rounded"
              onClick={() => handleMenuClick(2)}
            >
              <FaInfoCircle size={16} />
              {t('about')}
            </button>
          </li>
          <li className="mb-2">
            <button
              className="nav-link w-100 d-flex align-items-center gap-2 py-2 px-3 rounded"
              onClick={() => handleMenuClick(3)}
            >
              <FaServicestack size={16} />
              {t('services')}
            </button>
          </li>
          <li>
            <button
              className="nav-link w-100 d-flex align-items-center gap-2 py-2 px-3 rounded"
              onClick={() => handleMenuClick(4)}
            >
              <FaEnvelope size={16} />
              {t('contact')}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
