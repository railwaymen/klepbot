import UserModel from "./user-model";

export default class EmailModel {
  constructor({ user_id, google_id, body = '', subject = '', to = '', contact_id, user = {}, created_at, labels, read_at }) {
    this.userId = user_id;
    this.googleId = google_id;
    this.body = body;
    this.subject = subject;
    this.to = to;
    this.contactId = contact_id;
    this.createdAt = created_at;
    this.labels = labels;
    this.readAt = read_at;

    this.user = new UserModel(user);
  }

  toParams = () => ({
    to: this.to,
    body: this.body,
    subject: this.subject,
  })
}
