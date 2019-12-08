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
      <form>
        <div className="variables">
          <h4>Possible variables</h4>
          <p>{'{{firstName}}'}</p>
          <p>{'{{lastName}}'}</p>
          {/* <p>{'{{signature}}'}</p> */}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={this.onChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            type="text"
            className="form-control"
            value={body}
            onChange={this.onChange}
            name="body"
          />
        </div>
        <input type="submit" readOnly onClick={this.onSave} />
      </form>
    )
  }
}

export default EmailTemplateForm;
