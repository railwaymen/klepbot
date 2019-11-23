import React, { Component } from 'react';

import EmailTemplatesService from '../services/email-templates-service';

import EmailTemplateModel from '../models/email-template-model';
import EmailTemplateForm from '../components/email-templates/email-template-form';

class EmailTemplates extends Component {
  state = {
    template: new EmailTemplateModel({})
  }

  onSave = (params) => {
    return EmailTemplatesService.create(params).then(() => (
      new EmailTemplateModel({})
    ))
  }

  render() {
    const { template } = this.state;

    return (
      <div className="container">
        <h2>Create email template</h2>
        <EmailTemplateForm {...template} onSave={this.onSave} />
      </div>
    )
  }
}

export default EmailTemplates;
