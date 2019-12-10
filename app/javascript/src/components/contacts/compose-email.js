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

  onChange = (e) => {
    const { target: { value } } = e;

    this.setState({ template: value });
  }

  onSubmit = () => {
    const {
      props: { composeEmail },
      state: { template },
    } = this;

    composeEmail(template);
  }

  render() {
    const {
      props: { email },
      state: { template },
    } = this;

    return (
      <div className="details col">
        <div className="email-body">
          <p>{email}</p>
          <textarea rows="12" name="template" className="form-control" value={template} onChange={this.onChange} />
        </div>
        <EmailTemplates onSelect={this.onSelectTemplate} />
        <button type="button" className="btn btn-light" onClick={this.onSubmit}>Compose</button>
      </div>
    )
  }
}

export default ComposeEmail;
