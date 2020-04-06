import React from 'react';
import PropTypes from 'prop-types';
import styles from './Section.module.css';
const Section = props => {
  const { title, children } = props;
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};
export default Section;
