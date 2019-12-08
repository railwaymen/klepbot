import StatusModel from "./status-model";
import EventModel from "./event-model";

class ContactModel {
  constructor({ id, first_name, last_name, group, category, email, status, event }) {
    this.id = id;
    this.firstName = first_name || '';
    this.lastName = last_name || '';
    this.group = group || '';
    this.category = category || '';
    this.email = email || '';

    this.status = new StatusModel(status || {});
    this.event = new EventModel(event || {});

    this.original = {
      ...this.toParams(),
      status,
      event
    };
  }

  replaceAttributesForEmailTemplate = (template) => {
    let resolvedTempalte = template;

    ['firstName', 'lastName', 'email'].forEach(word => {
      resolvedTempalte = resolvedTempalte.replace(`{{${word}}}`, this[word]);
    });

    return resolvedTempalte;
  }

  toParams = () => ({
    first_name: this.firstName,
    last_name: this.lastName,
    group: this.group,
    category: this.category,
    email: this.email,
    contact_status_id: this.status.id,
    contact_event_id: this.event.id,
  })
}

export default ContactModel;
