import React from 'react';
import googlePlay from '../../assets/icons/google.svg';
import appStore from '../../assets/icons/apple.svg';

import cl from './Footer.module.css';

const Footer = () => (
  <footer className={cl.footer}>
    <ul className={cl.rights}>
      <li>
        {'© 2001–2022 ООО '}
        <a href="https://sweb.ru/">«СпейсВэб»</a>
      </li>
      <li>Все права защищены.</li>
      <li>
        {'Лицензия '}
        <a href="https://sweb.ru/documents/#%D1%81ertificates">№163230</a>
      </li>
    </ul>
    <div className={cl.download}>
      <h4 className={cl.downloadLabel}>Скачать приложение</h4>
      <div className={cl.downloadImages}>
        <img src={googlePlay} alt="Google Play" />
        <img src={appStore} alt="App Store" />
      </div>
    </div>
    <ul className={cl.numbers}>
      <li>
        <a href="rel:+78123341222">{'+7 (812) 334-12-22 '}</a>
        (в Санкт-Петербурге)
      </li>
      <li>
        <a href="rel:+74956631612">{'+7 (495) 663-16-12 '}</a>
        (в Москве)
      </li>
      <li>
        <a href="rel:+78001001615">{'+7 (800) 100-16-15 '}</a>
        (бесплатно по России)
      </li>
    </ul>
  </footer>
);

export default Footer;
