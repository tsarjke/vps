import React, { useState } from 'react';
import PropTypes from 'prop-types';

import cl from './DropDownList.module.css';

const DropDownList = ({
  className, labelClassName, itemClassName, label, subitems, icon,
}) => {
  const [isListVisible, setListVisible] = useState(false);

  const onListParentClickHandler = () => {
    setListVisible(!isListVisible);
  };

  const onListParentKeyUpHandler = (event) => {
    if (event.code === 'Enter') {
      onListParentClickHandler();
    }
  };

  return (
    <div
      className={className ? [cl.container, className].join(' ') : cl.container}
      onClick={onListParentClickHandler}
      role="menu"
      tabIndex={0}
      onKeyUp={onListParentKeyUpHandler}
    >
      <div className={labelClassName ? [cl.parentItem, labelClassName].join(' ') : cl.parentItem}>
        {icon && <img className={cl.icon} src={icon} alt={`label ${icon}`} />}
        <p>{label}</p>
      </div>
      {isListVisible && (
        <ul className={cl.subItemsList}>
          {subitems?.length
            ? subitems.map(({ text }) => (
              <li
                className={itemClassName ? [cl.subItem, itemClassName].join(' ') : cl.subItem}
                key={text}
              >
                {text}
              </li>
            ))
            : ''}
        </ul>
      )}
    </div>
  );
};

DropDownList.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  subitems: PropTypes.oneOfType([PropTypes.array]),
  icon: PropTypes.oneOfType([PropTypes.any]),
  labelClassName: PropTypes.string,
  itemClassName: PropTypes.string,
};

DropDownList.defaultProps = {
  className: '',
  icon: null,
  subitems: null,
  labelClassName: '',
  itemClassName: '',
};

export default DropDownList;
