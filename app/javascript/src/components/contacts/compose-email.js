import React, { Component, useContext } from 'react';
import EmailTemplates from '../shared/templates';
import NotificationsContext from '../../contexts/notifications-context';
import CurrentUserContext from '../../contexts/current-user-context';

class ComposeEmail extends Component {
  static contextType = NotificationsContext;

  state = {
    template: '',
  }

  onSelectTemplate = (template, signature) => {
    const { replaceAttributesForEmailTemplate } = this.props;

    this.setState({
      template: replaceAttributesForEmailTemplate(template.body, signature)
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
      <div className="details col form-control-klepbot">
        <div className="email-body">
          <p>{email}</p>
          <div className="input-anim-container">
            <label htmlFor="templateBody">Body</label>
            <div className="border" />
            <textarea rows="12" placeholder="Write your email" id="templateBody" name="template" className="form-control" value={template} onChange={this.onChange} />
            <div className="border" />
          </div>
        </div>
        <EmailTemplatesForCurrentUser onSelect={this.onSelectTemplate} />
        <div className="button-container">
          <button type="button" className="btn btn-light" onClick={this.onSubmit}>Compose</button>
        </div>
      </div>
    )
  }
}

function EmailTemplatesForCurrentUser({ onSelect }) {
  const { currentUser } = useContext(CurrentUserContext);

  const onSelectTemplate = (template) => {
    currentUser().then(user => {
      onSelect(template, user.signature);
    })
  }

  return (
    <EmailTemplates onSelect={onSelectTemplate} />
  )
}

export default ComposeEmail;
