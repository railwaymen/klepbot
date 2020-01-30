import ContactModel from './contact-model';

class NotificationModel {
  constructor({ id, contact_id, description, contact }) {
    this.id = id;
    this.contactId = contact_id;
    this.description = description;
    this.contact = new ContactModel(contact || {});
  }
}

export default NotificationModel;