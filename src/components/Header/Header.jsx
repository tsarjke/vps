import React from 'react';
import { useSelector } from 'react-redux';
import noticeIcon from '../../assets/icons/icon-notice.svg';

import cl from './Header.module.css';

const Header = () => {
  const { order } = useSelector((store) => store.vpsReducer);

  return (
    <header className={cl.header}>
      <div className={cl.headerInfo}>
        <div className={cl.orderCounter}>
          <p>{`Заказов: ${order.length}`}</p>
        </div>
        <div className={cl.amount}>
          <p>3467 ₽</p>
        </div>
        <div className={cl.user}>
          <div className={cl.noticeIcon}>
            <img src={noticeIcon} alt="" />
          </div>
          <p>username</p>
        </div>
        <button className={cl.logoutBtn} type="button">
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Header;
