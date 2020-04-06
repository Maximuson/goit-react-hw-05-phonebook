import React from 'react';
import PropTypes from 'prop-types';

const ContactsFilter = ({ onChange, filter }) => {
  return (
    <div>
      <input type="text" value={filter} onChange={onChange} name="filter" />
    </div>
  );
};

ContactsFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
export default ContactsFilter;
