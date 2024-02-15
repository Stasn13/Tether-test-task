import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

function Button({ children, className, onClick, transparent }) {
  return (
    <button
      data-testid="button"
      type="button"
      className={`${styles.button} ${className} ${
        transparent && styles.transparent
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  children: '',
  className: '',
  onClick: () => null,
  transparent: false,
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  transparent: PropTypes.bool,
};

export default Button;
