import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import EmailTemplatesService from '../services/email-templates-service';

import EmailTemplateForm from '../components/email-templates/email-template-form';

class EmailTemplates extends Component {
  state = {
    template: {}
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    EmailTemplatesService.find(id).then(template => {
      this.setState({ template })
    })
  }

  onSave = (params, id) => {
    return EmailTemplatesService.update(params, id)
  }

  render() {
    const { template } = this.state;

    return (
      <div className="container">
        <h2>Update email template</h2>
        <div className="row">
          <EmailTemplateForm
            {...template}
            key={template.id}
            onSave={this.onSave}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(EmailTemplates);
