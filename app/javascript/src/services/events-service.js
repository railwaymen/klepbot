import ApiService from './api-service';
import EventModel from '../models/event-model';

class UsersService {
  static all() {
    return ApiService.get({
      url: 'contact_events'
    }).then(events => (
      events.map(event => new EventModel(event))
    ));
  }
}

export default UsersService;