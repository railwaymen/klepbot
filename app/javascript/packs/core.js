import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NotificationsContext from '../src/contexts/notifications-context';

import Navbar from '../src/components/shared/navbar';
import Notifications from '../src/components/shared/notifications';

import Dashboard from '../src/pages/dashboard';

import EmailTemplates from '../src/pages/email-templates';
import EmailTemplateNew from '../src/pages/email-template-new';
import EmailTemplateEdit from '../src/pages/email-template-edit';

import Contacts from '../src/pages/contacts';
import NewContact from '../src/pages/new-contact';

import Stats from '../src/pages/stats';

class Core extends Component {
  state = {
    notifications: [],
  }

  pushNotification = (notification) => {
    notification.id = Math.floor(Math.random() * 10000);
    const { notifications } = this.state;

    this.setState({ notifications: notifications.concat([notification]) }, () => {
      setTimeout(() => {
        this.destroyNotification(notification.id);
      }, 2500);
    });
  }

  destroyNotification = (notificationId) => {
    const { notifications } = this.state;

    const filteredNotifications = notifications.filter(notification => (
      notification.id !== notificationId
    ))

    this.setState({ notifications: filteredNotifications });
  }

  render() {
    const { pushNotification, destroyNotification, state: { notifications } } = this;

    const notificationsProviderValue = {
      pushNotification,
      destroyNotification,
      notifications: notifications,
    }

    return (
      <NotificationsContext.Provider value={notificationsProviderValue}>
        <Router>
          <Notifications />
          <Navbar />
          <div className="body">
            <Switch>
              <Route path="/" exact>
                <Dashboard />
              </Route>
              <Route path="/email-templates" exact>
                <EmailTemplates />
              </Route>
              <Route path="/email-templates/new" exact>
                <EmailTemplateNew />
              </Route>
              <Route path="/email-templates/:id/edit">
                <EmailTemplateEdit />
              </Route>
              <Route path="/contacts" exact>
                <Contacts />
              </Route>
              <Route path="/contacts/new" exact>
                <NewContact />
              </Route>
              <Route path="/stats" exact>
                <Stats />
              </Route>
            </Switch>
          </div>
        </Router>
      </NotificationsContext.Provider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Core />,
    document.body.appendChild(document.createElement('div')),
  )
})
