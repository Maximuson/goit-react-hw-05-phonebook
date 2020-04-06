import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cleave from 'cleave.js/react';
import { v4 as uuid } from 'uuid';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitForm = e => {
    const contact = {
      id: uuid(),
      name: this.state.name,
      number: this.state.number,
    };
    this.props.handleSubmit(e, contact);
    this.setState({
      name: '',
      number: '',
    });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.submitForm}>
        <div>
          <h3>Name</h3>
          <input
            placeholder="Enter name"
            onChange={this.handleInput}
            name="name"
            value={name}
            type="text"
          />
        </div>
        <div>
          <h3>Number</h3>
          <Cleave
            onChange={this.handleInput}
            name="number"
            placeholder="Enter phone number"
            value={number}
            options={{
              delimiter: '-',
              blocks: [3, 2, 2],
              numericOnly: true,
            }}
          />
        </div>
        <input type="submit" value="Add" />
      </form>
    );
  }
}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
