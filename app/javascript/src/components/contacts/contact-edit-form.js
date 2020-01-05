import React, { Component } from 'react';

class ContactEditForm extends Component {
  onChange = (e) => {
    const { value, name } = e.target;
    const { onContactChange } = this.props;

    onContactChange({ value, name });
  }

  onSubmit = () => {
    this.props.saveChanges();
  }

  onEventChange = (e) => {
    const { value, name } = e.target;
    const { onContactEventChange } = this.props;

    onContactEventChange({ value, name });
  }

  onStatusChange = (e) => {
    const { value, name } = e.target;
    const { onContactStatusChange } = this.props;

    onContactStatusChange({ value, name });
  }

  render() {
    const {
      firstName,
      lastName,
      group,
      category,
      email,
      statuses,
      events,
      status: { id: statusId },
      event: { id: eventId },
    } = this.props;

    return (
      <form className="col-md-12 form-control-klepbot">
        <div className="input-group mb-3 input-anim-container">
          <input
            type="text"
            id="contact_first_name"
            className="form-control"
            placeholder="First name"
            aria-label="First name"
            value={firstName}
            name="firstName"
            onChange={this.onChange}
          />
          <div className="border"></div>
        </div>
        <div className="input-group mb-3 input-anim-container">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            aria-label="Last name"
            value={lastName}
            name="lastName"
            onChange={this.onChange}
          />
          <div className="border"></div>
        </div>

        <div className="input-group mb-3 input-anim-container">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            aria-label="email"
            value={email}
            name="email"
            onChange={this.onChange}
          />
          <div className="border"></div>
        </div>
        <div className="input-group mb-3 input-anim-container">
          <input
            type="text"
            className="form-control"
            placeholder="Group"
            aria-label="Group"
            value={group}
            name="group"
            onChange={this.onChange}
          />
          <div className="border"></div>
        </div>
        <div className="input-group mb-3 input-anim-container">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            aria-label="Category"
            value={category}
            name="category"
            onChange={this.onChange}
          />
          <div className="border"></div>
        </div>
        <div className="input-group mb-3 input-anim-container">
          <select name="contact_event_id" className="form-control" onChange={this.onEventChange} value={eventId}>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
          <div className="border"></div>
        </div>
        <div className="input-group mb-3">
          <select name="contact_status_id" className="form-control" onChange={this.onStatusChange} value={statusId}>
            {statuses.map(status => (
              <option key={status.id} value={status.id}>{status.name}</option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3 button-container">
          <button type="button" className="btn btn-light" onClick={this.onSubmit}>Save Contact</button>
        </div>
      </form>
    )
  }
}

export default ContactEditForm;
