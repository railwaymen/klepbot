import React, { Component } from 'react';
import ContactEditForm from '../components/contacts/contact-edit-form';

import NotificationsContext from '../contexts/notifications-context';

import ContactModel from '../models/contact-model';
import ContactsService from '../services/contacts-service';
import EventsService from '../services/events-service';
import StatusesService from '../services/statuses-service';

class NewContact extends Component {
  static contextType = NotificationsContext;

  state = {
    contact: new ContactModel({}),
    statuses: [],
    events: [],
  }

  componentDidMount() {
    StatusesService.all().then(statuses => {
      this.setState({ statuses })
    });

    EventsService.all().then(events => {
      this.setState({ events })
    });
  }

  onChange = ({ value, name }) => {
    let { contact } = this.state;

    contact[name] = value;
    this.setState({ contact });
  }

  onContactEventChange = ({ value }) => {
    const { events } = this.state;
    let { contact } = this.state;

    const selectedEvent = events.find(event => event.id === parseInt(value));

    if (!selectedEvent) return this.displayIncorrectActionAlert();

    contact.event = selectedEvent;
    this.setState({ contact });
  }

  onContactStatusChange = ({ value }) => {
    const { statuses } = this.state;
    let { contact } = this.state;

    const selectedStatus = statuses.find(status => status.id === parseInt(value));

    if (!selectedStatus) return this.displayIncorrectActionAlert();

    contact.status = selectedStatus;
    this.setState({ contact });
  }

  onContactSave = () => {
    const {
      state: { contact },
      context: { pushNotification }
    } = this;

    ContactsService.create(contact.toParams()).then(() => {
      this.setState({
        contact: new ContactModel({}),
      }, () => {
        pushNotification({
          header: 'Success!',
          type: 'success',
          body: 'Your contact have been created',
        })
      });
    }).catch(e => {
      pushNotification({
        header: 'Error!',
        type: 'error',
        body: `There was an error while trying to save contact ${e.message}`,
      })
    });
  }

  render() {
    const { contact, events, statuses } = this.state;

    return (
      <div className="container">
        <div className="row">
          <h2>Create contact</h2>
          <ContactEditForm
            {...contact}
            onContactChange={this.onChange}
            onContactEventChange={this.onContactEventChange}
            onContactStatusChange={this.onContactStatusChange}
            saveChanges={this.onContactSave}
            statuses={statuses}
            events={events}
          />
        </div>
      </div>
    )
  }
}

export default NewContact;
