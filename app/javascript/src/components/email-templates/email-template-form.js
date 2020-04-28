import React, { Component } from 'react';
import NotificationsContext from '../../contexts/notifications-context';
import TinyMCE from '../shared/tiny-mce';

class EmailTemplateForm extends Component {
  static contextType = NotificationsContext;

  constructor(props) {
    super(props);

    const { name, body, subject, id } = this.props;

    this.state = {
      id,
      name,
      subject,
      body,
    };
  }

  onSave = (e) => {
    e.preventDefault();

    const {
      state: { name, body, subject, id },
      props: { onSave }
    } = this;

    const params = { name, body, subject };

    onSave(params, id)
      .then(template => {
        this.setState({
          name: template.name,
          body: template.body,
          body: template.subject,
        });

        this.context.pushNotification({
          header: 'Success!',
          type: 'success',
          body: 'Email template have been created',
        })
      })
      .catch(e => {
        alert('Can\'t save your changes')
      });
  }

  onChange = (e) => {
    const { target: { value, name } } = e;

    this.setState({
      [name]: value
    })
  }

  injectVariable = (name) => {
    const { body } = this.state;

    this.setState({
      body: `${body} {{${name}}}`,
    });
  }

  render() {
    const { name, body, subject } = this.state;

    return (
      <form className="col form-control-klepbot">
        <div className="form-group input-anim-container">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Template name"
            className="form-control"
            value={name}
            onChange={this.onChange}
            name="name"
          />
          <div className="border"></div>
        </div>
        <div className="form-group input-anim-container">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            placeholder="Mail subject"
            className="form-control"
            value={subject}
            onChange={this.onChange}
            name="subject"
          />
          <div className="border"></div>
        </div>
        <div className="form-group input-anim-container">
          <label htmlFor="body">Body</label>
          <div className="variables">
            <span className="variable" onClick={() => this.injectVariable('firstName')}>First name</span>
            <span className="variable" onClick={() => this.injectVariable('lastName')}>Last name</span>
            <span className="variable" onClick={() => this.injectVariable('signature')}>Signature</span>
          </div>
          <div className="border"></div>
          <TinyMCE
            value={body}
            onChange={this.onChange}
            name="body"
          />
          <div className="border"></div>
        </div>
        <div className="button-container">
          <input type="submit" readOnly onClick={this.onSave} value="Create Template" />
        </div>
      </form>
    )
  }
}

export default EmailTemplateForm;
