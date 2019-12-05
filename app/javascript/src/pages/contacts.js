import React, { Component } from 'react';
import ContactsService from '../services/contacts-service';

import Contact from '../components/contacts/contact';
import ContactModal from '../components/contacts/contact-modal';

class Contacts extends Component {
  state = {
    page: 1,
    contacts: [],
    modalContactId: null,
    openModal: false,
  }

  componentDidMount() {
    const { page } = this.state;

    ContactsService.page(page).then(contacts => {
      this.setState({ contacts })
    })
  }

  openModal = (contactId) => {
    this.setState({
      openModal: true,
      modalContactId: contactId,
    })
  }

  closeModal = () => {
    this.setState({
      modalContactId: null,
      openModal: false,
    })
  }

  render() {
    const { contacts, modalContactId, openModal } = this.state;

    return (
      <div className="container contacts">
        { openModal ?
          <ContactModal
            contactId={modalContactId}
            closeModal={this.closeModal}
          /> : null
        }
        <div className="row">
          <h2>Contacts</h2>
          <div className="col-sm-3 my-1">
            <input type="text" className="form-control" onChange={console.log} placeholder="Type to search" />
          </div>
          {contacts.map(contact => (
            <Contact
              {...contact}
              key={contact.id}
              openModal={this.openModal}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Contacts;
