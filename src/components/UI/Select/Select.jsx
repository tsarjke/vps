import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import cl from './Select.module.css';

const Select = ({
  options,
  valueName = 'value',
  labelName = 'name',
  defaultValue,
  onChange,
  className,
  placeholder,
  title,
}) => {
  const [isSelectOpen, setSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const selectRef = useRef(null);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
      if (onChange) {
        onChange(defaultValue);
      }
    }
  }, [defaultValue, options]);

  useEffect(() => {
    const onOutsideClickhandler = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setSelectOpen(false);
      }
    };

    document.addEventListener('click', onOutsideClickhandler);

    return () => {
      document.removeEventListener('click', onOutsideClickhandler);
    };
  }, []);

  const onSelectClickHandler = () => {
    setSelectOpen(!isSelectOpen);
  };

  const onSelectKeyUpHandler = (event) => {
    if (event.code === 'Enter') {
      onSelectClickHandler();
    }
  };

  const onOptionClickHandler = (event) => {
    const { value } = event.target;
    const selectedOption = options.find((opt) => opt[valueName] === value);
    setSelectedValue(selectedOption);
    if (onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <div
      ref={selectRef}
      onClick={onSelectClickHandler}
      onKeyUp={onSelectKeyUpHandler}
      role="button"
      tabIndex={-1}
      className={className ? [cl.container, className].join(' ') : cl.container}
    >
      {title && <h2 className={cl.title}>{title}</h2>}
      <div
        className={selectedValue ? [cl.control, cl.selectedBorder].join(' ') : cl.control}
        role="button"
        tabIndex={0}
      >
        {selectedValue ? (
          <p className={cl.selected}>{selectedValue[labelName]}</p>
        ) : (
          <p className={cl.placeholder}>{placeholder}</p>
        )}
        <div className={isSelectOpen ? [cl.indicator, cl.rotate].join(' ') : cl.indicator}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className={cl.arrow}
              x="1.63604"
              y="5.59814"
              width="1"
              height="9"
              rx="0.5"
              transform="rotate(-45 1.63604 5.59814)"
              fill="#AFBABF"
            />
            <rect
              className={cl.arrow}
              x="13.6569"
              y="4.89111"
              width="1"
              height="9"
              rx="0.5"
              transform="rotate(45 13.6569 4.89111)"
              fill="#AFBABF"
            />
          </svg>
        </div>
      </div>
      {isSelectOpen && (
        <ul className={cl.list}>
          {options
            && options.map((option) => (
              <li key={option[valueName]}>
                <button
                  className={
                    selectedValue && selectedValue[valueName] === option[valueName]
                      ? [cl.option, cl.selectedOption].join(' ')
                      : cl.option
                  }
                  value={option[valueName]}
                  onClick={onOptionClickHandler}
                  type="button"
                >
                  {option[labelName]}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.object]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  valueName: PropTypes.string,
  labelName: PropTypes.string,
};

Select.defaultProps = {
  onChange: null,
  defaultValue: null,
  className: '',
  placeholder: '',
  title: null,
  options: null,
  valueName: 'value',
  labelName: 'name',
};

export default Select;
