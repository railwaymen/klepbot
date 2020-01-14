import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import EventModel from '../models/event-model';

import NotificationsContext from '../contexts/notifications-context';

import EventForm from '../components/events/event-form';
import EventsService from '../services/events-service';

class Event extends Component {
  static contextType = NotificationsContext;

  state = {
    event: new EventModel({}),
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) EventsService.find(id).then(event => this.setState({ event }))
  }

  onChange = ({ value, name }) => {
    let { event } = this.state;

    event[name] = value;
    this.setState({ event });
  }

  onEventSave = () => {
    const {
      state: { event, event: { id } },
      context: { pushNotification }
    } = this;

    EventsService.create(event.toParams()).then(fetchedEvent => {
      this.setState({
        event: id ? fetchedEvent : new EventModel({}),
      }, () => {
        pushNotification({
          header: 'Success!',
          type: 'success',
          body: `Your event have been ${id ? 'updated' : 'created'}`,
        })
      });
    }).catch(e => {
      pushNotification({
        header: 'Error!',
        type: 'error',
        body: `There was an error while trying to save event ${e.message}`,
      })
    });
  }

  render() {
    const { event } = this.state;

    return (
      <div className="container">
        <div className="row">
          <h2>Create contact</h2>
          <EventForm
            onChange={this.onChange}
            saveChanges={this.onEventSave}
            {...event}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Event);