import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../lang.jsx";
import "../assets/css/Contact.css";

const Contact = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    service: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert(t("contact_success"));
    setForm({ service: "", name: "", email: "", phone: "", message: "" });
  };

  const serviceOptions = t("services_list", { returnObjects: true });

  return (
    <section id="contact" className="container py-5">
      <h2 className="section-title mb-4 text-center">{t("contact_title")}</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">{t("contact_name")}</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">{t("contact_email")}</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">{t("contact_phone")}</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">{t("contact_service")}</label>
          <select
            className="form-select"
            name="service"
            value={form.service}
            onChange={handleChange}
            required
          >
            <option value="">{t("contact_select")}</option>
            {serviceOptions.map((item, i) => (
              <option key={i} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">{t("contact_message")}</label>
          <textarea
            className="form-control"
            rows="4"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button type="submit" className="btn contact-submit-btn">
            {t("contact_submit")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
