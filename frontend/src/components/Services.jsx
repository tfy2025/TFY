import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import "../assets/css/Services.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  FaLaptopCode,
  FaMobileAlt,
  FaDatabase,
  FaCloud,
  FaTools,
} from "react-icons/fa";

const iconMap = {
  FaLaptopCode: <FaLaptopCode size={40} className="mb-3 text-primary" />,
  FaMobileAlt: <FaMobileAlt size={40} className="mb-3 text-success" />,
  FaDatabase: <FaDatabase size={40} className="mb-3 text-warning" />,
  FaCloud: <FaCloud size={40} className="mb-3 text-info" />,
  FaTools: <FaTools size={40} className="mb-3 text-danger" />,
};

const Services = () => {
  const { i18n } = useTranslation();
  const sliderRef = useRef(null);
  const [services, setServices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Tải JSON từ Flask backend
  useEffect(() => {
    const lang = i18n.language || "vi";
    fetch(`http://127.0.0.1:5000/locales/${lang}/services.json`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => {
        console.error("❌ Lỗi tải dịch vụ:", err);
      });
  }, [i18n.language]);

  const settings = {
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    infinite: true,
    dots: false,
    arrows: true,
    afterChange: (index) => setActiveIndex(index),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  const goToSlide = (index) => {
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <section id="services" className="services-section py-5">
      <div className="container text-center">
        <h2 className="section-title mb-4">
          {i18n.language === "en" ? "SERVICES" : "DỊCH VỤ"}
        </h2>

        <Slider {...settings} ref={sliderRef}>
          {services.map((item, index) => (
            <div key={index} className="p-3">
              <div className="service-card card shadow-sm h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  {iconMap[item.icon] || null}
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <div className="mt-4 d-flex flex-wrap justify-content-center gap-3">
          {services.map((item, index) => (
            <div
              key={index}
              className={`thumb-card border rounded px-3 py-3 text-start ${
                activeIndex === index ? "active-tab" : ""
              }`}
              style={{ width: "220px", cursor: "pointer" }}
              onClick={() => goToSlide(index)}
            >
              <div className="d-flex align-items-center justify-content-center mb-2">
                {iconMap[item.icon] && (
                  <div className="me-2 pt-2 mb-0 d-flex align-items-center justify-content-center">
                    {React.cloneElement(iconMap[item.icon], { size: 24 })}
                  </div>
                )}
                <strong>{item.title}</strong>
              </div>
              <small>{item.description}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
