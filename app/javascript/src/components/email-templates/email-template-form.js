import React, { Component } from 'react';
import NotificationsContext from '../../contexts/notifications-context';

class EmailTemplateForm extends Component {
  static contextType = NotificationsContext;

  constructor(props) {
    super(props);

    const { name, body, id } = this.props;

    this.state = {
      id,
      name,
      body
    };
  }

  onSave = (e) => {
    e.preventDefault();

    const {
      state: { name, body, id },
      props: { onSave }
    } = this;

    const params = { name, body };

    onSave(params, id)
      .then(template => {
        this.setState({
          name: template.name,
          body: template.body
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

  render() {
    const { name, body } = this.state;

    return (
      <form className="col form-control-klepbot">
        <div className="variables">
          <h4>Possible variables</h4>
          <p>{'{{firstName}}'}</p>
          <p>{'{{lastName}}'}</p>
          <p>{'{{signature}}'}</p>
        </div>
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
          <label htmlFor="body">Body</label>
          <div className="border"></div>
          <textarea
            id="body"
            type="text"
            className="form-control"
            placeholder="Template body"
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
