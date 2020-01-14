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
        <div className="row">
          <h2>Create email template</h2>
          <div className="col-12">
            <EmailTemplateForm {...template} onSave={this.onSave} />
          </div>
        </div>
      </div>
    )
  }
}

export default EmailTemplates;
