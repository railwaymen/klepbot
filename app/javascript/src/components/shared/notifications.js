import React, { useContext } from 'react';
import NotificationsContext from '../../contexts/notifications-context';

export default function Notifications() {
  const { notifications } = useContext(NotificationsContext);

  return (
    <div className="app-toasts">
      <div className="app-toasts-body">
        {notifications.map(notification => (
          <div className={`app-toast with-hide ${notification.type}`}>
            <div className="icon"><i className="far fa-check-circle"></i></div>
            <div className="toast-body">
              <div className="text"><b>{notification.header}</b></div>
              <div className="text description">{notification.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
