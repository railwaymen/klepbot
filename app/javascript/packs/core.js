import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from '../src/components/shared/navbar';

import Dashboard from '../src/pages/dashboard';
import EmailTemplates from '../src/pages/email-templates';
import EmailTemplateNew from '../src/pages/email-template-new';
import EmailTemplateEdit from '../src/pages/email-template-edit';
import Contacts from '../src/pages/contacts';

class Core extends Component {
  render() {
    return (
      <Router>
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
          </Switch>
        </div>
      </Router>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Core />,
    document.body.appendChild(document.createElement('div')),
  )
})
