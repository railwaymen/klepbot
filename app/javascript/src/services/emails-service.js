import ApiService from './api-service';
import EmailModel from '../models/email-model';

class EmailsService {
  static async contactEmails(contactId) {
    return ApiService.get({
      url: `contacts/${contactId}/emails`
    }).then((results) => results.map((email) => new EmailModel(email)));
  }

  static async create(contactId, params) {
    return ApiService.post({
      url: `contacts/${contactId}/emails`,
      body: JSON.stringify({ email: params }),
    }).then((email) => new EmailModel(email));
  }

  static async isGmailConnected() {
    const response = await ApiService.get({ url: 'gmail/connected' });

    return response.gmail_connected;
  }
}

export default EmailsService;
