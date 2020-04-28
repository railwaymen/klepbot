import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NotificationsContext from '../src/contexts/notifications-context';
import CurrentUserContext from '../src/contexts/current-user-context';

import Navbar from '../src/components/shared/navbar';
import Notifications from '../src/components/shared/notifications';

import Dashboard from '../src/pages/dashboard';

import EmailTemplates from '../src/pages/email-templates';
import EmailTemplateNew from '../src/pages/email-template-new';
import EmailTemplateEdit from '../src/pages/email-template-edit';

import Contacts from '../src/pages/contacts';
import NewContact from '../src/pages/new-contact';

import Events from '../src/pages/events';
import Event from '../src/pages/event';

import Statuses from '../src/pages/statuses';
import Status from '../src/pages/status';

import Stats from '../src/pages/stats';

import Profile from '../src/pages/profile';

import Tasks from '../src/pages/tasks';
import Gmail from '../src/pages/gmail';

import UsersService from '../src/services/users-service';

class Core extends Component {
  state = {
    notifications: [],
    currentUser: null,
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

  currentUser = async () => {
    const { currentUser } = this.state;

    if (currentUser) return currentUser;

    return UsersService.currentUser().then(user => {
      this.setState({ currentUser: user });

      return user;
    }).then(user => {
      return user;
    });
  }

  updateCurrentUser = (currentUser) => {
    this.setState({
      currentUser
    });
  }

  render() {
    const {
      currentUser,
      updateCurrentUser,
      pushNotification,
      destroyNotification,
      state: { notifications },
    } = this;

    const notificationsProviderValue = {
      pushNotification,
      destroyNotification,
      notifications: notifications,
    }

    const currentUserProviderValue = {
      currentUser,
      updateCurrentUser,
    }

    return (
      <NotificationsContext.Provider value={notificationsProviderValue}>
        <CurrentUserContext.Provider value={currentUserProviderValue}>
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
                <Route path="/contacts/new" exact>
                  <NewContact />
                </Route>
                <Route path="/contacts/:id">
                  <Contacts />
                </Route>
                <Route path="/contacts" exact>
                  <Contacts />
                </Route>
                <Route path="/events" exact>
                  <Events />
                </Route>
                <Route path="/tasks" exact>
                  <Tasks />
                </Route>
                <Route path="/events/new" exact>
                  <Event />
                </Route>
                <Route path="/events/:id/edit" exact>
                  <Event />
                </Route>
                <Route path="/statuses" exact>
                  <Statuses />
                </Route>
                <Route path="/statuses/new" exact>
                  <Status />
                </Route>
                <Route path="/statuses/:id/edit" exact>
                  <Status />
                </Route>
                <Route path="/stats" exact>
                  <Stats />
                </Route>
                <Route path="/profile" exact>
                  <Profile />
                </Route>
                <Route path="/gmail" exact>
                  <Gmail ></Gmail>
                </Route>
              </Switch>
            </div>
          </Router>
        </CurrentUserContext.Provider>
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
