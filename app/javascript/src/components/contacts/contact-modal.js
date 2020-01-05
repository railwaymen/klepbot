import React, { Component } from 'react';

import ContactsService from '../../services/contacts-service';
import ContactModel from '../../models/contact-model';
import NotificationsContext from '../../contexts/notifications-context';

import ContactEditForm from './contact-edit-form';
import ComposeEmail from './compose-email';
import ContactAction from './contact-action';
import EventsService from '../../services/events-service';
import StatusesService from '../../services/statuses-service';

class ContactModal extends Component {
  static contextType = NotificationsContext;

  state = {
    contact: new ContactModel({}),
    contactActions: [],
    statuses: [],
    events: [],
  }

  componentDidMount() {
    const { contactId } = this.props;

    ContactsService.find(contactId).then(contact => {
      this.setState({contact })
    });

    ContactsService.actions(contactId).then(contactActions => {
      this.setState({ contactActions })
    });

    StatusesService.all().then(statuses => {
      this.setState({ statuses })
    })

    EventsService.all().then(events => {
      this.setState({ events })
    })
  }

  displayIncorrectActionAlert = () => {
    this.context.pushNotification({
      header: 'Error!',
      type: 'error',
      body: 'There was an error with data flow during edit',
    })
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
      state: {
        contact, contact: { id }
      },
      context: { pushNotification }
    } = this;

    ContactsService.update(id, contact.toParams()).then(updatedContact => {
      const { contactActions } = this.state;
      const contactAction = updatedContact.toAction();

      this.setState({
        contact: updatedContact,
        contactActions: [contactAction].concat(contactActions),
      }, () => {
        pushNotification({
          header: 'Success!',
          type: 'success',
          body: 'Your contact have been updated',
        })
      });
    }).catch(e => {
      pushNotification({
        header: 'Error!',
        type: 'error',
        body: e.message,
      })
    });
  }

  onChange = ({ value, name }) => {
    let { contact } = this.state;

    contact[name] = value;
    this.setState({ contact });
  }

  onEmailSubmit = (template) => {
    const {
      state: {
        contactActions, contact
      },
      context: { pushNotification }
    } = this;

    ContactsService.createEmailAction(contact.id, template).then(contactAction => {
      this.setState({
        contactActions: [contactAction].concat(contactActions),
      })
    }).then(() => {
      pushNotification({
        header: 'Success!',
        type: 'success',
        body: 'Your email template have been saved',
      });
    }).catch(e => {
      pushNotification({
        header: 'Error!',
        type: 'error',
        body: `There was an error with processing request '${e.message}'`,
      });
    });
  }

  render() {
    const {
      state: {
        contact: {
          firstName, lastName,
          event: { name: eventName, color: eventColor },
          status: { name: statusName, color: statusColor },
        },
        statuses,
        events,
        contact,
        contactActions,
      },
      props: { closeModal },
    } = this;

    return (
      <div className="modal">
        <div className="container">
          <div className="row box">
            <div className="col">
              <h1>{firstName} {lastName}</h1>
            </div>
            <div className="modal-info-pills">
              <div className="big-info-pill" style={{borderColor: eventColor, color: eventColor}}>{eventName}</div>
              <div className="big-info-pill" style={{borderColor: statusColor, color: statusColor}}>{statusName}</div>
            </div>
            <div className="modal-info-close">
              <i className="fas fa-times" onClick={closeModal}></i>
            </div>
          </div>
          <div className="row box">
            <div className="col-md-12">
              <h4>Informations</h4>
              <div>
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
          </div>
          <div className="row box">
            <div className="col-md-12">
              <h4>Prepare email</h4>
              <div>
                <ComposeEmail
                  {...contact}
                  composeEmail={this.onEmailSubmit}
                />
              </div>
            </div>
          </div>
          <div className="history row box">
            <div className="col-md-12">
              <h4>History</h4>
              <div>
                {contactActions.map(action => (
                  <ContactAction
                    {...action}
                    key={action.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactModal;
