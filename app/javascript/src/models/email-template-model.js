class EmailTemplateModel {
  constructor({ id, name, body }) {
    this.id = id || null;
    this.name = name || '';
    this.body = body || '';
  }
}

export default EmailTemplateModel;
