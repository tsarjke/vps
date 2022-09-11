import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setOrder } from '../../store/reducers/vpsSlice';
import Select from '../UI/Select/Select';
import Checkbox from '../UI/Checkbox/Checkbox';
import headerIcon from '../../assets/icons/card-icon.svg';
import bonusIcon from '../../assets/icons/icon-plus.svg';

import cl from './OfferCard.module.css';
import Button from '../UI/Button/Button';

// Вспомогательный массив для расстевления ГГц
const possibleGHz = [
  { name: 'KVM', value: '2,8' },
  { name: 'HDD', value: '2,1' },
  { name: 'TURBO', value: '5' },
];

//! Вероятно, компонент стоить раздробить на части
const OfferCard = ({ data, className }) => {
  const dispatch = useDispatch();

  const [currentOs, setCurrentOs] = useState(null);
  const [currentPanel, setCurrentPanel] = useState(null);
  const [currentDataCenter, setcurrentDataCenter] = useState(null);

  const {
    plan, selectOs, selectPanel, osPanel, datacenters,
  } = data;
  const {
    name,
    volume_disk: disk,
    disk_type: diskType,
    ram,
    cpu_cores: cpuCores,
    is_promo: promo,
    year_price_per_month: regPrice,
    year_price_per_month_promo: promoPrice,
    datacenters: availableDataCentres,
  } = plan;
  const price = useMemo(() => (promo === '0' ? regPrice : promoPrice), [promo]);
  const ghz = useMemo(() => possibleGHz.find((pos) => name.includes(pos.name), [name]).value);

  const onChange = (setFunction, selectedValue) => setFunction(selectedValue);

  // Изменение цены после выбора ПО (некоторые имеют доп. цену)
  const correctedPrice = useMemo(() => {
    if (currentPanel) {
      return price + currentPanel.price;
    }
    return price;
  }, [price, currentPanel]);

  // Изменение возможных вариантов ПО в зависимости от выбранной ОС
  const filteredSelectPanel = useMemo(() => {
    if (selectPanel && osPanel && currentOs) {
      const availableOsPanel = osPanel.reduce((acc, { os, panel }) => {
        if (os === currentOs.id) {
          acc.push(panel);
        }
        return acc;
      }, []);
      return selectPanel.filter(({ id }) => availableOsPanel.includes(id));
    }
    return selectPanel;
  }, [currentOs, osPanel, selectPanel]);

  // Список дата-центров с полными свдедениями и информацией о доступности
  const fullDataCentresInfo = useMemo(
    () => datacenters.map((dataC) => {
      if (availableDataCentres.includes(+dataC.id)) {
        return { ...dataC, available: true };
      }
      return { ...dataC, available: false };
    }),
    [datacenters, availableDataCentres],
  );

  const onOrderBtnClickHandler = () => {
    dispatch(
      setOrder({
        plan,
        correctedPrice,
        currentOs,
        currentPanel,
        currentDataCenter,
      }),
    );
  };

  return (
    <div className={className ? [cl.container, className].join(' ') : cl.container}>
      <header className={cl.header}>
        <div className={cl.headerIcon}>
          <img src={headerIcon} alt="Card icon" />
        </div>
        <h2 className={cl.title}>{name}</h2>
      </header>
      <div className={cl.price}>
        <h2>{`${correctedPrice} ₽/мес.`}</h2>
      </div>
      <ul className={cl.specifications}>
        <li className={cl.specItem}>
          CPU
          <span>{`${cpuCores} x ${ghz} ГГц`}</span>
        </li>
        <li className={cl.specItem}>
          RAM
          <span>{`${ram} МБ`}</span>
        </li>
        <li className={cl.specItem}>
          DISK
          <span>{`${disk} ${diskType}`}</span>
        </li>
      </ul>
      <ul className={cl.selection}>
        <li className={cl.selectionItem}>
          <Select
            options={selectOs}
            placeholder="Выберите дистрибутив"
            title="Дистрибутив"
            valueName="name"
            labelName="description"
            defaultValue={selectOs ? selectOs[0] : null}
            onChange={(selected) => onChange(setCurrentOs, selected)}
          />
        </li>
        <li className={cl.selectionItem}>
          <Select
            options={filteredSelectPanel}
            placeholder="Выберите ПО"
            title="Программное обеспечение"
            valueName="name"
            labelName="description"
            defaultValue={filteredSelectPanel ? filteredSelectPanel[0] : null}
            onChange={(selected) => onChange(setCurrentPanel, selected)}
          />
        </li>
        <li className={cl.selectionItem}>
          <Checkbox
            options={fullDataCentresInfo}
            valueName="name"
            labelName="location"
            title="Дата-центр"
            onChange={(checked) => onChange(setcurrentDataCenter, checked)}
          />
        </li>
      </ul>
      <div className={cl.bonus}>
        <div className={cl.bonusIcon}>
          <img src={bonusIcon} alt="+ icon" />
        </div>
        <ul className={cl.bonusList}>
          <li className={cl.bonusListItem}>2 IP-адреса (lPv4 + IPv6)</li>
          {!name.includes('HDD') && <li className={cl.bonusListItem}>3 резервных копии</li>}
        </ul>
      </div>
      <Button className={cl.btn} onClick={onOrderBtnClickHandler}>
        Заказать
      </Button>
    </div>
  );
};

OfferCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

OfferCard.defaultProps = {
  className: null,
};

export default OfferCard;
