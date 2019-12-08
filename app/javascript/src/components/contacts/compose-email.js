import React, { Component } from 'react';
import EmailTemplates from '../shared/templates';
import NotificationsContext from '../../contexts/notifications-context';

class ComposeEmail extends Component {
  static contextType = NotificationsContext;

  state = {
    template: '',
  }

  onSelectTemplate = (template) => {
    const { replaceAttributesForEmailTemplate } = this.props;

    this.setState({
      template: replaceAttributesForEmailTemplate(template.body)
    })
  }

  onSubmit = () => {
    const { pushNotification } = this.context;

    pushNotification({
      header: 'Success!',
      type: 'success',
      body: 'Your contact have been updated',
    })
  }

  render() {
    const {
      props: { email },
      state: { template },
    } = this;

    return (
      <div className="details">
        <div className="email-body">
          <p>{email}</p>
          <textarea name="template" className="form-control" value={template} onChange={this.onChange} />
        </div>
        <EmailTemplates onSelect={this.onSelectTemplate} />
        <button type="button" className="btn btn-light" onClick={this.onSubmit}>Compose</button>
      </div>
    )
  }
}

export default ComposeEmail;
