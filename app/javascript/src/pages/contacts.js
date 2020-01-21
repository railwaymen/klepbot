import React, { Component } from 'react';
import ContactsService from '../services/contacts-service';

import EmailTemplatesContext from '../contexts/email-templates-context';

import Contact from '../components/contacts/contact';
import ContactModal from '../components/contacts/contact-modal';
import EmailTemplatesService from '../services/email-templates-service';
import SearchInput from '../components/shared/search-input';
import { withRouter } from 'react-router-dom';

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.page = 1;
    this.query = '';

    this.state = {
      contacts: [],
      modalContactId: null,
      openModal: false,
    }
  }

  onScroll = () => {
    const lineHeight = window.innerHeight + document.documentElement.scrollTop;
    const offset = document.documentElement.offsetHeight;

    if (lineHeight === offset) {
      this.page += 1;

      const { state: { contacts }, page, query } = this;

      ContactsService.search({ query, page }).then(fetchedContacts => {
        if (fetchedContacts.length > 0) {
          this.setState({ contacts: contacts.concat(fetchedContacts) })
        } else {
          window.onscroll = null;
        }
      });
    }
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  componentDidUpdate(prevProps, nextProps) {
    console.log({prevProps, nextProps});
  }

  componentDidMount() {
    const { page } = this;
    const { id } = this.props.match.params;
    if (id) this.openModal(id);

    window.onscroll = this.onScroll;

    ContactsService.page(page).then(contacts => {
      this.setState({ contacts })
    });

    EmailTemplatesService.all().then(templates => {
      this.setState({ templates });
    })
  }

  openModal = (contactId) => {
    this.setState({
      openModal: true,
      modalContactId: contactId,
    })
  }

  closeModal = () => {
    const { modalContactId, contacts } = this.state;

    ContactsService.find(modalContactId).then(updatedContact => {
      const updatedContacts = contacts.map(contact => {
        if (updatedContact.id === contact.id) return updatedContact;
        return contact
      });

      this.setState({
        modalContactId: null,
        openModal: false,
        contacts: updatedContacts
      })
    });
  }

  search = (value) => {
    this.page = 1;
    this.query = value;

    const { page, query } = this;

    ContactsService.search({ query, page }).then(contacts => {
      this.setState({ contacts });

      window.onscroll = this.onScroll;
    });
  }

  render() {
    const { contacts, modalContactId, openModal, templates } = this.state;

    return (
      <EmailTemplatesContext.Provider value={{templates}}>
        <div className="container contacts">
          { openModal ?
            <ContactModal
              contactId={modalContactId}
              closeModal={this.closeModal}
            /> : null
          }
          <div className="row">
            <div className="col-12">
              <h2>Contacts</h2>
            </div>
            <div className="col-12">
              <SearchInput onStopTyping={this.search} />
            </div>
            <div className="box row">
              {contacts.map(contact => (
                <Contact
                  {...contact}
                  key={contact.id}
                  openModal={this.openModal}
                />
              ))}
            </div>
          </div>
        </div>
      </EmailTemplatesContext.Provider>
    )
  }
}

export default withRouter(Contacts);
