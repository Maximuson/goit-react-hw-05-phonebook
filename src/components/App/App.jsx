import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import Section from '../Section/Section';

import ContactList from '../ContactList/ContactList';
import ContactsFilter from '../ContactsFilter/ContactsFilter';
import { CSSTransition } from 'react-transition-group';
import slideTransitions from '../../transitions/slide.module.css';
import filterTransition from '../../transitions/pop.module.css';
import Notification from '../Notification/Notification';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    didMount: false,
  };
  componentDidMount() {
    let contacts = [];
    try {
      contacts =
        JSON.parse(localStorage.getItem('contacts')) || this.state.contacts;
    } catch (e) {
      contacts = [];
    }
    this.setState(ps => {
      return {
        contacts,
        didMount: true,
      };
    });
  }
  componentDidUpdate() {
    localStorage.setItem(
      'contacts',
      JSON.stringify(this.state.contacts, null, 2),
    );
  }

  filterContacts = (contacts, filter) => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e, contact) => {
    e.preventDefault();
    if (
      this.state.contacts.findIndex(item => item.name === contact.name) !== -1
    ) {
      this.setState({
        contactExistModal: true,
      });
      setTimeout(() => {
        this.setState({ contactExistModal: false });
      }, 2000);
      return false;
    }
    this.setState(state => {
      return {
        contacts: [...state.contacts, contact],
        filter: '',
      };
    });
  };

  handleDelete = id => {
    this.setState(ps => {
      return {
        contacts: ps.contacts.filter(item => item.id !== id),
      };
    });
  };

  render() {
    const {
      name,
      number,
      contacts,
      filter,
      didMount,
      contactExistModal,
    } = this.state;
    const filteredContacts = this.filterContacts(contacts, filter);

    return (
      <div>
        <CSSTransition
          in={didMount}
          classNames={slideTransitions}
          timeout={250}
          key={0}
          appear
        >
          <h1>Phonebook</h1>
        </CSSTransition>
        <Section>
          <ContactForm
            name={name}
            number={number}
            handleSubmit={this.handleSubmit}
            handleInput={this.handleInput}
          />
        </Section>
        <Section title="Contacts">
          <CSSTransition
            in={contacts.length > 1}
            classNames={filterTransition}
            timeout={250}
            unmountOnExit
          >
            <ContactsFilter onChange={this.handleInput} filter={filter} />
          </CSSTransition>

          <ContactList
            handleDelete={this.handleDelete}
            contacts={filteredContacts}
          />
        </Section>
        <CSSTransition
          in={contactExistModal}
          classNames={filterTransition}
          timeout={250}
          unmountOnExit
        >
          <Notification />
        </CSSTransition>
      </div>
    );
  }
}
