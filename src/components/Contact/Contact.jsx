import React from 'react';
import PropTypes from 'prop-types';

const Contact = ({ name = '', number = '', handleDelete }) => (
  <div>
    <span>
      {name || 'noName'}: {number || 'noNumber'}
    </span>
    <button onClick={handleDelete} type="button">
      Delete
    </button>
  </div>
);

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Contact;
