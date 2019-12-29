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
}

export default UsersService;