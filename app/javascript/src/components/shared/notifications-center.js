import React, { Component } from 'react';
import NotificationsService from '../../services/notifications-service';
import { Link } from 'react-router-dom';

class NotificationsCenter extends Component {
  state = {
    notifications: [],
    displayNotifications: true,
  }

  componentDidMount() {
    this.fetchNotifications();

    setInterval(this.fetchNotifications, 60000);
    setInterval(() => { this.setState((state) => ({ displayNotifications: !state.displayNotifications })) }, 5000)
  }

  fetchNotifications = () => {
    NotificationsService.all().then(notifications => {
      this.setState({ notifications });
    });
  }

  render() {
    const { notifications, displayNotifications } = this.state;

    return (
      <li className="nav-item dropdown">
        <a className="nav-link notifications" href="javascript:void(0)">
          {displayNotifications ? <div className="counter">2</div> : null}
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
