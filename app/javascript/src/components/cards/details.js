import React, { Component } from 'react';
import EmailTemplates from '../shared/templates';

class Details extends Component {
  state = {
    template: this.props.card.body,
  }

  onSelectTemplate = ({ body }) => {
    const template = this.props.card.replaceAttributesForEmailTemplate(body);

    this.setState({ template });
  }

  onChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    });
  }

  onSave = () => {
    const {
      props: { onCardUpdate },
      state: { template },
    } = this;

    onCardUpdate({ body: template })
  }

  render() {
    const {
      props: { card: { email } },
      state: { template },
    } = this;

    return (
      <div className="details form-control-klepbot">
        <div className="email-body">
          <p>{email}</p>
          <textarea name="template" className="form-control" value={template} onChange={this.onChange} />
          <input onClick={this.onSave} className="btn btn-default" type="submit" value="Save changes" />
        </div>
        <EmailTemplates onSelect={this.onSelectTemplate} />
      </div>
    )
  }
}

export default Details;
