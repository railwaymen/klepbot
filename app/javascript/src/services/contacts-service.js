import ApiService from './api-service';
import ContactModel from '../models/contact-model';
import ContactActionModel from '../models/contact-action-model';
import StatusModel from '../models/status-model';
import EventModel from '../models/event-model';

class ContactsService {
  static async find(id) {
    return ApiService.get({
      url: `contacts/${id}`
    }).then(contact => (
      new ContactModel(contact)
    ))
  }

  static async statuses() {
    return ApiService.get({
      url: `contact_statuses`
    }).then(statuses => (
      statuses.map(status => new StatusModel(status))
    ))
  }

  static async events() {
    return ApiService.get({
      url: `contact_events`
    }).then(events => (
      events.map(event => new EventModel(event))
    ))
  }

  static async actions(id) {
    return ApiService.get({
      url: `contacts/${id}/actions`
    }).then(contactActions => (
      contactActions.map(action => new ContactActionModel(action))
    ))
  }

  static async page(page) {
    return ApiService.get({
      url: `contacts?page=${page}`
    }).then(contacts => (
      contacts.map(contact => new ContactModel(contact))
    ))
  }

  static async update(id, params) {
    return ApiService.put({
      url: `contacts/${id}`,
      body: JSON.stringify({ contact: params }),
    }).then(contact => (
      new ContactModel(contact)
    ))
  }
}

export default ContactsService;
