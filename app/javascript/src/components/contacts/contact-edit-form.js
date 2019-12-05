import React, { Component } from 'react';

class ContactEditForm extends Component {
  onChange = (e) => {
    const { value, name } = e.target;
    const { onContactChange } = this.props;

    this.setState({
      [name]: value
    })
  }

  render() {
    const { id,
      firstName,
      lastName,
      group,
      category,
      email,
      status,
      event,
    } = this.props;

    return (
      <div className="col-md-12">
        <h5>Informations</h5>
        <p><b>ID</b> {id}</p>
        <p><b>First name</b> {firstName}</p>
        <p><b>Last name</b> {lastName}</p>
        <p><b>Group</b> {group}</p>
        <p><b>Category</b> {category}</p>
        <p><b>Email</b> {email}</p>
        <p><b>Status</b> {status}</p>
        <p><b>Event</b> {event}</p>
        <h5>Edit</h5>
        <h5>History</h5>
      </div>
    )
  }
}

export default ContactEditForm;
