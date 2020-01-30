import React, { Component } from 'react';
import NotificationsService from '../../services/notifications-service';
import { Link } from 'react-router-dom';

class NotificationsCenter extends Component {
  state = {
    notifications: [],
    notificationsCount: 0,
  }

  componentDidMount() {
    this.fetchNotifications();

    setInterval(this.fetchNotifications, 5000);
  }

  fetchNotifications = () => {
    NotificationsService.all().then(({ notificationsCount, notifications }) => {
      this.setState({
        notifications,
        notificationsCount,
      });
    });
  }

  readNotifications = () => {
    const { notificationsCount } = this.state;

    if (notificationsCount === 0) return;

    NotificationsService.readNotifications().then(() => {
      this.setState({
        notificationsCount: 0,
      })
    });
  }

  render() {
    const { notifications, notificationsCount } = this.state;
    const displayNotifications = notificationsCount > 0;

    return (
      <li className="nav-item dropdown" onClick={this.readNotifications}>
        <a className="nav-link notifications" href="javascript:void(0)">
          {displayNotifications ? <div className="counter">{notificationsCount}</div> : null}
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
