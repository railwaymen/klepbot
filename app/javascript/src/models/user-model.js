class UserModel {
  constructor({ id, first_name, last_name, email, token, avatar_url, color, signature }) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.token = token;
    this.avatarUrl = avatar_url || '';
    this.color = color || '#FF9A7B';
    this.signature = signature;

    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  attachFile = (file) => {
    this.file = file;
  }

  toDataForm = () => {
    const form = new FormData();
    const params = this.toParams();

    Object.keys(params).map(key => {
      form.append(`user[${key}]`, params[key])
    });

    if (this.file) form.append('user[avatar]', this.file);

    return form;
  }

  toParams = () => ({
    first_name: this.firstName,
    last_name: this.lastName,
    email: this.email,
    color: this.color,
    signature: this.signature,
  })
}

export default UserModel;