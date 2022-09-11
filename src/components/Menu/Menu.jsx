import React, { useState, useRef, useEffect } from 'react';
import DropDownList from '../UI/DropDownList/DropDownList';
import headerIcon from '../../assets/icons/menu/logo-sweb.svg';
import orderVpsIcon from '../../assets/icons/menu/order-vps.svg';
import accountIcon from '../../assets/icons/menu/account.svg';
import serverIcon from '../../assets/icons/menu/server.svg';
import monitoringIcon from '../../assets/icons/menu/monitoring.svg';
import domenIcon from '../../assets/icons/menu/domen.svg';
import sslIcon from '../../assets/icons/menu/ssl.svg';
import shopIcon from '../../assets/icons/menu/shop.svg';
import seoAndAdIcon from '../../assets/icons/menu/seo-and-ad.svg';
import helpIcon from '../../assets/icons/menu/help.svg';
import ideaIcon from '../../assets/icons/menu/idea.svg';

import cl from './Menu.module.css';

const Menu = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const onOutsideClickhandler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('click', onOutsideClickhandler);

    return () => {
      document.removeEventListener('click', onOutsideClickhandler);
    };
  }, []);

  const onMenuBtnClick = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <nav className={isMenuVisible ? cl.openedNav : cl.closedNav} ref={menuRef}>
      <button
        type="button"
        className={isMenuVisible ? cl.menuBtn : [cl.menuBtn, cl.onlyMenuBtn].join(' ')}
        onClick={onMenuBtnClick}
      >
        <div />
        <div />
        <div />
      </button>
      {isMenuVisible ? (
        <div className={cl.container}>
          <header className={cl.header}>
            <div className="">
              <a href="https://sweb.ru/">
                <img src={headerIcon} alt="" />
              </a>
            </div>
          </header>
          <ul className={cl.menuList}>
            <li className={[cl.menuItem, cl.activeMenuItem].join(' ')}>
              <DropDownList
                className={cl.dropDown}
                label="Заказать VPS"
                icon={orderVpsIcon}
                subitems={[]}
                labelClassName={cl.dropDownLabel}
                itemClassName={cl.dropDownItem}
              />
            </li>
            <li className={cl.menuItem}>
              <DropDownList
                className={cl.dropDown}
                label="Аккаунт"
                icon={accountIcon}
                subitems={[{ text: 'Профиль' }, { text: 'Финансы' }, { text: 'Услуги' }]}
                labelClassName={cl.dropDownLabel}
                itemClassName={cl.dropDownItem}
              />
            </li>
            <li className={cl.menuItem}>
              <DropDownList
                className={cl.dropDown}
                label="Серверы"
                icon={serverIcon}
                subitems={[
                  { text: 'username_vps_1' },
                  { text: 'username_vps_2' },
                  { text: 'username_vps_3' },
                ]}
                labelClassName={cl.dropDownLabel}
                itemClassName={cl.dropDownItem}
              />
            </li>
            <li className={cl.menuItem}>
              <DropDownList
                className={cl.dropDown}
                label="Мониторинг"
                icon={monitoringIcon}
                labelClassName={cl.dropDownLabel}
                itemClassName={cl.dropDownItem}
              />
            </li>
            <li className={cl.menuItem}>
              <DropDownList
                className={cl.dropDown}
                label="Домены"
                icon={domenIcon}
                subitems={[
                  { text: 'Мои домены' },
                  { text: 'Доменные бонусы' },
                  { text: 'Доменные персоны' },
                ]}
                labelClassName={cl.dropDownLabel}
                itemClassName={cl.dropDownItem}
              />
            </li>
            <li className={cl.menuItem}>
              <DropDownList
                className={cl.dropDown}
                label="SSL"
                icon={sslIcon}
                labelClassName={cl.dropDownLabel}
                itemClassName={cl.dropDownItem}
              />
            </li>
            <li className={cl.menuItem}>
              <DropDownList
                className={cl.dropDown}
                label="Магазин"
                icon={shopIcon}
                labelClassName={cl.dropDownLabel}
                itemClassName={cl.dropDownItem}
              />
            </li>
            <li className={cl.menuItem}>
              <DropDownList
                className={cl.dropDown}
                label="SEO и реклама"
                icon={seoAndAdIcon}
                labelClassName={cl.dropDownLabel}
                itemClassName={cl.dropDownItem}
              />
            </li>
            <li className={cl.menuItem}>
              <DropDownList
                className={cl.dropDown}
                label="Поддержка"
                icon={helpIcon}
                labelClassName={cl.dropDownLabel}
                itemClassName={cl.dropDownItem}
              />
            </li>
            <li className={cl.menuItem}>
              <DropDownList
                className={cl.dropDown}
                label="Есть идея"
                icon={ideaIcon}
                labelClassName={cl.dropDownLabel}
                itemClassName={cl.dropDownItem}
              />
            </li>
          </ul>
        </div>
      ) : (
        ''
      )}
    </nav>
  );
};
export default Menu;
