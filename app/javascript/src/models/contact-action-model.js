import StatusModel from "./status-model";
import EventModel from "./event-model";

class ContactActionModel {
  constructor({
    id, first_name, last_name, group, category, email, email_body,
    status, event, reason, contact_id, created_at, action_type
  }) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.group = group;
    this.category = category;
    this.email = email;
    this.reason = reason;
    this.contactId = contact_id;
    this.createdAt = created_at;
    this.actionType = action_type || 'updated';
    this.emailBody = email_body;

    this.status = new StatusModel(status || {});
    this.event = new EventModel(event || {});
  }
}

export default ContactActionModel;
