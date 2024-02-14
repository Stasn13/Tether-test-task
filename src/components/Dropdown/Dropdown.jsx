import React from 'react';
import PropTypes from 'prop-types';

import styles from './Dropdown.module.scss';

function Dropdown({ onChange, options, value }) {
  const handleChange = ({ target }) => onChange(target.value);

  return (
    <select
      className={styles.dropDown}
      data-testid="dropdown"
      onChange={handleChange}
      value={value}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
};

export default Dropdown;
