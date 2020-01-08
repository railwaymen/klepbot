import ApiService from './api-service';
import UserModel from '../models/user-model';

class UsersService {
  static all() {
    return ApiService.get({
      url: 'users'
    }).then(users => (
      users.map(user => new UserModel(user))
    ));
  }

  static currentUser() {
    return ApiService.get({
      url: 'profile'
    }).then(user => new UserModel(user));
  }

  static async currentUserUpdate(params) {
    return ApiService.put({
      url: 'profile',
      body: params,
      headers: {},
    }).then(user => (
      new UserModel(user)
    ))
  }
}

export default UsersService;