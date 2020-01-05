import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NotificationsContext from '../contexts/notifications-context';

import EventsService from '../services/events-service';
import { displayErrorMessages } from '../helpers/errors-helpers';

class Events extends Component {
  static contextType = NotificationsContext;

  state = {
    events: [],
  }

  componentDidMount() {
    EventsService.all().then(events => {
      this.setState({ events })
    })
  }

  onDelete = (id) => {
    const { pushNotification } = this.context;

    EventsService.destroy(id).then(() => {
      const { events } = this.state;

      const filteredEvents = events.filter(event => event.id !== id);
      this.setState({ events: filteredEvents }, () => {
        pushNotification({
          header: 'Success!',
          type: 'success',
          body: `Your event have been removed`,
        })
      });
    }).catch(errors => {
      pushNotification({
        header: 'Error!',
        type: 'error',
        body: `There was an error while trying to remove event: ${displayErrorMessages(errors)}`,
      });
    });
  }

  render() {
    const { events } = this.state;

    return (
      <div className="container">
        <h2>Events</h2>
        <Link to="/events/new">New</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Actions</th>
              <th>ID</th>
              <th>Name</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            { events.map(event => (
              <Event
                key={event.id}
                {...event}
                onDelete={this.onDelete}
              />
            )) }
          </tbody>
        </table>
      </div>
    )
  }
}

function Event({ id, name, color, onDelete }) {
  const onDeleteItem = () => onDelete(id);

  return (
    <tr>
      <td>
        <Link to={`/events/${id}/edit`}><i className="far fa-edit"></i></Link>
        <a href="javascript:void(0)" onClick={onDeleteItem}><i className="far fa-trash-alt"></i></a>
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{color}</td>
    </tr>
  )
}

export default Events;