import ApiService from './api-service';
import ContactModel from '../models/contact-model';
import ContactActionModel from '../models/contact-action-model';

class ContactsService {
  static async find(id) {
    return ApiService.get({
      url: `contacts/${id}`
    }).then(contact => (
      new ContactModel(contact)
    ))
  }

  static async search({ query, page }) {
    return ApiService.get({
      url: `contacts?page=${page}&query=${query}`
    }).then(contacts => (
      contacts.map(contact => new ContactModel(contact))
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

  static async createEmailAction(contactId, template) {
    return ApiService.post({
      url: `contacts/${contactId}/actions`,
      body: JSON.stringify({ contact_action: { email_body: template, action_type: 'email' } }),
    }).then(action => (
      new ContactActionModel(action)
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

  static async create(params) {
    return ApiService.post({
      url: `contacts`,
      body: JSON.stringify({ contact: params }),
    }).then(contact => (
      new ContactModel(contact)
    ))
  }
}

export default ContactsService;
