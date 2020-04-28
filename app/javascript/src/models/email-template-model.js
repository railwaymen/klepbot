class EmailTemplateModel {
  constructor({ id, name, body, subject }) {
    this.id = id || null;
    this.name = name || '';
    this.body = body || '';
    this.subject = subject || '';
  }
}

export default EmailTemplateModel;
