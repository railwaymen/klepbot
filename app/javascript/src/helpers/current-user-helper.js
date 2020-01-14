import UserModel from "../models/user-model";

class CurrentUser {
  static get() {
    const json = JSON.parse(localStorage.getItem('currentUser'));

    return new UserModel(json);
  }

  static save(object) {
    localStorage.setItem('user', JSON.stringify(object));

    return object;
  }

  static clear() {
    localStorage.removeItem('user');
  }
}