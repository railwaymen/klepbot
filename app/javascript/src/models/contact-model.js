class ContactModel {
  constructor({ first_name, last_name, group, category, email, status, event }) {
    this.firstName = first_name;
    this.lastName = last_name;
    this.group = group;
    this.category = category;
    this.email = email;
    this.status = status;
    this.event = event || 'Manually';
  }

  statusColor = () => {
    switch (this.status) {
      case 'first_contact':
        return '#0c0c0c';
    }
  }

  eventColor = () => {
    switch (this.event) {
      case 'gitex':
        return '#AD5AFF';
      case 'websummit':
        return '#41A9FF';
      default:
        return '#2C9134';
    }
  }
}

export default ContactModel;
