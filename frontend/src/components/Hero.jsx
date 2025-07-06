import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../assets/css/Hero.css";
import "../lang.jsx";
import bgImage from "../assets/img/bg.jpg";

const Hero = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    loginId: "",
    loginPassword: "",
  });

  // Tự động đăng nhập nếu có ?name= & role= trong URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const role = params.get("role");

    if (name && role) {
      localStorage.setItem("userName", name);
      localStorage.setItem("role", role);
      window.history.replaceState({}, "", "/");
      window.location.reload();
    }
  }, []);

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setIsRegister(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "user",
      loginId: "",
      loginPassword: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.password
      ) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert("✅ Đăng ký thành công!");
            localStorage.setItem("userName", formData.name);
            setShowForm(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error(err);
          alert("❌ Lỗi khi đăng ký!");
        });
    } else {
      if (!formData.loginId || !formData.loginPassword) {
        alert("Vui lòng nhập email/số điện thoại và mật khẩu!");
        return;
      }

      fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_or_phone: formData.loginId,
          password: formData.loginPassword,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert("❌ " + data.error);
          } else {
            alert("✅ Đăng nhập thành công!");
            localStorage.setItem("userName", data.name);
            localStorage.setItem("role", data.role);
            setShowForm(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error(err);
          alert("❌ Lỗi khi đăng nhập!");
        });
    }
  };

  return (
    <div
      className="hero-section d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-overlay" />
      <div className="hero-content text-white text-center">
        <h1 className="hero-title">{t("hero_title")}</h1>
        <p>{t("hero_subtitle")}</p>

        {!showForm && !localStorage.getItem("userName") && (
          <button onClick={handleToggleForm} className="btn btn-light mt-3">
            {t("hero_button")}
          </button>
        )}

        {showForm && (
          <div
            className="auth-form mt-4 bg-white text-dark p-4 rounded"
            style={{ maxWidth: "400px", margin: "0 auto" }}
          >
            <h5 className="mb-3 text-center">
              {isRegister ? t("auth_register") : t("auth_login")}
            </h5>

            <form onSubmit={handleSubmit}>
              {isRegister ? (
                <>
                  <div className="mb-3">
                    <label>{t("auth_name")}</label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder={t("auth_name")}
                    />
                  </div>
                  <div className="mb-3">
                    <label>{t("auth_email")}</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label>{t("auth_phone")}</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="0123456789"
                    />
                  </div>
                  <div className="mb-3">
                    <label>{t("auth_password")}</label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="******"
                    />
                  </div>
                  <div className="mb-3">
                    <label>{t("auth_role")}</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="user">{t("role_user")}</option>
                      <option value="worker">{t("role_worker")}</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label>{t("auth_email_or_phone")}</label>
                    <input
                      name="loginId"
                      type="text"
                      value={formData.loginId}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Email hoặc số điện thoại"
                    />
                  </div>
                  <div className="mb-3">
                    <label>{t("auth_password")}</label>
                    <input
                      name="loginPassword"
                      type="password"
                      value={formData.loginPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="******"
                    />
                  </div>
                </>
              )}

              <button type="submit" className="btn btn-success w-100">
                {isRegister ? t("auth_register") : t("auth_login")}
              </button>

              <div className="text-center mt-3">
                <small>
                  {isRegister
                    ? t("already_have_account")
                    : t("dont_have_account")}
                  <button
                    type="button"
                    onClick={() => setIsRegister(!isRegister)}
                    className="btn btn-link btn-sm"
                  >
                    {isRegister ? t("auth_login") : t("auth_register")}
                  </button>
                </small>
              </div>
            </form>

            <hr />
            <div className="text-center mb-2">{t("auth_or_login_with")}</div>
            <div className="d-flex justify-content-around mb-3">
              <a
                href="http://127.0.0.1:5000/auth/google-login"
                className="btn btn-outline-dark"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                href="http://127.0.0.1:5000/auth/facebook-login"
                className="btn btn-outline-primary"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="btn btn-outline-info">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="#" className="btn btn-outline-danger">
                <i className="fab fa-youtube"></i>
              </a>
            </div>

            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={handleToggleForm}
            >
              {t("auth_close")}
            </button>
          </div>
        )}

        <div className="scroll-down mt-4">
          <span>{t("hero_scroll")}</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
