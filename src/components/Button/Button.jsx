import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

function Button({ children, className, onClick }) {
  return (
    <button
      data-testid="button"
      type="button"
      className={`${styles.button} ${className}`}
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
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
