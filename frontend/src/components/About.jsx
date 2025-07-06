import React from 'react';
import { useTranslation } from 'react-i18next';
import '../lang.jsx'; // Đảm bảo i18n được init

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="container py-5">
      <h2 className="section-title mb-3 text-center">{t('about_title')}</h2>
      <p>{t('about_para_1')}</p>
      <p>{t('about_para_2')}</p>
      <p><em>{t('about_para_3')}</em></p>
    </section>
  );
};

export default About;
