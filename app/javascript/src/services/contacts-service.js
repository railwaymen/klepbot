import ApiService from './api-service';
import ContactModel from '../models/contact-model';

class ContactsService {
  static async find(id) {
    return ApiService.get({
      url: `contacts/${id}`
    }).then(contact => (
      new ContactModel(contact)
    ))
  }

  static async page(page) {
    return ApiService.get({
      url: `contacts?page=${page}`
    }).then(contacts => (
      contacts.map(contact => new ContactModel(contact))
    ))
  }
}

export default ContactsService;
