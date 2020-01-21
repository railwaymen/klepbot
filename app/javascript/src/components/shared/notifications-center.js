import React, { Component } from 'react';
import NotificationsService from '../../services/notifications-service';
import { Link } from 'react-router-dom';

class NotificationsCenter extends Component {
  state = {
    notifications: [],
  }

  componentDidMount() {
    this.fetchNotifications();

    setInterval(this.fetchNotifications, 60000);
  }

  fetchNotifications = () => {
    NotificationsService.all().then(notifications => {
      this.setState({ notifications });
    });
  }

  render() {
    const { notifications } = this.state;

    return (
      <li className="nav-item dropdown">
        <a className="nav-link" href="javascript:void(0)">
          <i className="fas fa-bell"></i>
        </a>
        <ul className="dropdown-menu">
          {notifications.map(notification => (
            <Notification {...notification} key={notification.id} />
          ))}
        </ul>
      </li>
    )
  }
}

function Notification({ contact: { fullName }, description, contactId }) {
  return (
    <li>
      <Link to={`/contacts/${contactId}`}><b>{fullName}</b></Link>
      <p>{description}</p>
    </li>
  )
}

export default NotificationsCenter;