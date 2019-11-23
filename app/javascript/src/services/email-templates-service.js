import ApiService from './api-service';
import EmailTemplateModel from '../models/email-template-model';

class EmailTemplatesService {
  static async find(id) {
    return ApiService.get({
      url: `email_templates/${id}`
    }).then(template => (
      new EmailTemplateModel(template)
    ))
  }

  static async all() {
    return ApiService.get({
      url: 'email_templates'
    }).then(templates => (
      templates.map(template => new EmailTemplateModel(template))
    ));
  }

  static async create(params) {
    return ApiService.post({
      url: 'email_templates',
      body: JSON.stringify({ email_template: params })
    }).then(template => (
      new EmailTemplateModel(template)
    ))
  }

  static async update(params, id) {
    return ApiService.put({
      url: `email_templates/${id}`,
      body: JSON.stringify({ email_template: params })
    }).then(template => (
      new EmailTemplateModel(template)
    ))
  }
}

export default EmailTemplatesService;
