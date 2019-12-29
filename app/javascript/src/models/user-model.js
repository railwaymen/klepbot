class UserModel {
  constructor({ id, first_name, last_name, email }) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;

    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}

export default UserModel;