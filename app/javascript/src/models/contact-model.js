import StatusModel from "./status-model";
import EventModel from "./event-model";
import ContactActionModel from "./contact-action-model";
import ContactsService from "../services/contacts-service";

class ContactModel {
  constructor({ id, first_name, last_name, group, category, email, status, event, updated_at, phone, hubspot_id }) {
    this.id = id;
    this.firstName = first_name || '';
    this.lastName = last_name || '';
    this.group = group || '';
    this.category = category || '';
    this.email = email || '';
    this.updatedAt = updated_at;
    this.phone = phone;
    this.hubspotId = hubspot_id;

    this.fullName = `${this.firstName} ${this.lastName}`;

    this.status = new StatusModel(status || {});
    this.event = new EventModel(event || {});
  }

  toAction = () => (
    new ContactActionModel({
      ...this.toParams(),
      id: new Date(),
      created_at: this.updatedAt,
      status: this.status,
      event: this.event,
    })
  )

  replaceAttributesForEmailTemplate = (template, signature = 'Missing signature!') => {
    let resolvedTempalte = template;

    ['firstName', 'lastName', 'email'].forEach(word => {
      resolvedTempalte = resolvedTempalte.replace(`{{${word}}}`, this[word]);
    });

    resolvedTempalte = resolvedTempalte.replace(`{{signature}}`, signature);

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
    phone: this.phone,
  })
}

export default ContactModel;
