import React, { Component } from 'react';
import { Link } from "react-router-dom";

import EmailTemplatesService from '../services/email-templates-service';

import Template from '../components/email-templates/email-template-item';

class EmailTemplates extends Component {
  state = {
    templates: []
  }

  componentDidMount() {
    EmailTemplatesService.all().then(templates => {
      this.setState({ templates })
    })
  }

  render() {
    const { templates } = this.state;

    return (
      <div className="container">
        <h2>Email templates</h2>
        <Link to="/email-templates/new">New</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Actions</th>
              <th>ID</th>
              <th>Name</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            { templates.map(template => (
              <Template key={template.id} {...template} />
            )) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default EmailTemplates;
