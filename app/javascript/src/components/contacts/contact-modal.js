import React, { Component } from 'react';
import ContactsService from '../../services/contacts-service';

class ContactModal extends Component {
  state = {
    contact: {}
  }

  componentDidMount() {
    const { id } = this.props;

    ContactsService.find(id).then(contact => {
      this.setState({ contact })
    })
  }

  render() {
    const { firstName, lastName } = this.state.contact;
    const { closeModal } = this.props;

    return (
      <div className="modal">
        <div className="container">
          <div className="row">
            <i className="fas fa-times" onClick={closeModal}></i>
            <div className="row-md-12">
              <h1>{firstName} {lastName}</h1>
            </div>

            <h5>Edit</h5>
            <h5>History</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactModal;
