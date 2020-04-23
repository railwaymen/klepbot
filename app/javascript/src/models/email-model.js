export default class EmailModel {
  constructor({ user_id, google_id, body = '', subject = '', to = '' }) {
    this.userId = user_id;
    this.googleId = google_id;
    this.body = body;
    this.subject = subject;
    this.to = to;
  }

  toParams = () => ({
    to: this.to,
    body: this.body,
    subject: this.subject,
  })
}
