import ApiService from './api-service';
import EmailModel from '../models/email-model';

class EmailsService {
  static async create(params) {
    return ApiService.post({
      url: 'emails',
      body: JSON.stringify({ email: params }),
    }).then((email) => new EmailModel(email));
  }

  static async isGmailConnected() {
    const response = await ApiService.get({ url: 'emails/gmail_connected' });

    return response.gmail_connected;
  }
}

export default EmailsService;
