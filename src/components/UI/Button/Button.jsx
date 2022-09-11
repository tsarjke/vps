import React from 'react';
import PropTypes from 'prop-types';

import cl from './Button.module.css';

const Button = ({
  children, disabled, className, onClick,
}) => (
  <button
    type="button"
    className={className ? [cl.btn, className].join(' ') : cl.btn}
    disabled={disabled}
    onClick={onClick || undefined}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  className: '',
  onClick: null,
};

export default Button;
