import React, { Component } from 'react';
import ContactsService from '../../services/contacts-service';
import ContactModel from '../../models/contact-model';
import ContactEditForm from './contact-edit-form';
import EmailTemplates from '../shared/templates';

class ContactModal extends Component {
  state = {
    contact: new ContactModel({})
  }

  componentDidMount() {
    const { contactId } = this.props;

    ContactsService.find(contactId).then(contact => {
      this.setState({ contact })
    })
  }

  onContactSave = (params) => {
    ContactsService.update(id, params).then(contact => {
      this.setState({ contact });
    });
  }

  onChange = ({ value, name }) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const {
      state: {
        contact: {
          firstName, lastName, status, statusColor, event, eventColor,
        },
        contact,
      },
      props: { closeModal },
    } = this;

    return (
      <div className="modal">
        <div className="container">
          <i className="fas fa-times" onClick={closeModal}></i>
          <div className="row">
            <div>
              <h1>{firstName} {lastName}</h1>
            </div>
            <div>
              <div style={{backgroundColor: eventColor()}}>{event}</div>
            </div>
            <div>
              <div style={{backgroundColor: statusColor()}}>{status}</div>
            </div>
          </div>
          <div className="row">
            <ContactEditForm
              {...contact}
              onContactChange={this.onChange}
              onSave={this.onContactSave}
            />
          </div>
          <div className="row">
            <h4>Prepare email</h4>
            <EmailTemplates onSelect={alert} />
          </div>
        </div>
      </div>
    )
  }
}

export default ContactModal;
