import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from '../UI/Select/Select';

import cl from './Categories.module.css';

const Categories = ({ defaultValue, options, onChange }) => {
  const allOptions = useMemo(() => {
    if (options) {
      return [defaultValue, ...options];
    }
    if (defaultValue) {
      return [defaultValue];
    }
    return null;
  }, [defaultValue, options]);

  return (
    <div className={cl.categories}>
      <Select
        className={cl.categoriesSelect}
        title="Категория"
        options={allOptions}
        onChange={onChange}
        defaultValue={allOptions ? allOptions[0] : null}
        valueName="slug"
      />
    </div>
  );
};

Categories.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.object]),
  onChange: PropTypes.func,
};

Categories.defaultProps = {
  defaultValue: null,
  onChange: null,
  options: null,
};

export default Categories;
