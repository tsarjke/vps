import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import cl from './Checkbox.module.css';

const Checkbox = ({
  options, valueName, labelName, defaultValue, title, onChange,
}) => {
  const [checkedValue, setCheckedValue] = useState(defaultValue);
  const [isDidabled, setDisabled] = useState(null);

  // Выставление дефолтного значения и параметра disabled (для прозрачности "чекбокса")
  // в зависимости от доступности
  useEffect(() => {
    if (options) {
      const [firstOpt, secondOpt] = options;
      if (firstOpt.available) {
        setCheckedValue(firstOpt);
        onChange(firstOpt);
      } else if (secondOpt.available) {
        setCheckedValue(secondOpt);
        onChange(secondOpt);
      }
      if (firstOpt.available && secondOpt.available) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [options]);

  const onVariantClickHandler = (event) => {
    const { value } = event.target;
    const checkedOption = options.find((opt) => opt[valueName] === value);
    if (checkedOption.available) {
      setCheckedValue(checkedOption);
      if (onChange) {
        onChange(checkedOption);
      }
    }
  };

  return (
    <div className={cl.container}>
      {title && <h2 className={cl.title}>{title}</h2>}
      <div className={isDidabled ? [cl.btnsWrapper, cl.disabled].join(' ') : cl.btnsWrapper}>
        {options.map((option) => (
          <button
            key={option[valueName]}
            className={
              checkedValue && checkedValue[valueName] === option[valueName]
                ? [cl.variant, cl.checked].join(' ')
                : cl.variant
            }
            value={option[valueName]}
            onClick={onVariantClickHandler}
            type="button"
          >
            {option[labelName]}
          </button>
        ))}
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  defaultValue: PropTypes.string,
  title: PropTypes.string,
  valueName: PropTypes.string,
  labelName: PropTypes.string,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  defaultValue: null,
  title: null,
  valueName: 'value',
  labelName: 'name',
  onChange: null,
};

export default Checkbox;
