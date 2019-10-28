import ApiService from './api-service';
import EmailTemplateModel from '../models/email-template-model';

class EmailTemplatesService {
  static async all() {
    return ApiService.get({
      url: 'email_templates'
    }).then(templates => (
      templates.map(template => new EmailTemplateModel(template))
    ));
  }
}

export default EmailTemplatesService;
