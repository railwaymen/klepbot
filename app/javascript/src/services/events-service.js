import ApiService from './api-service';
import EventModel from '../models/event-model';

class EventsService {
  static all() {
    return ApiService.get({
      url: 'contact_events'
    }).then(events => (
      events.map(event => new EventModel(event))
    ));
  }

  static async find(id) {
    return ApiService.get({
      url: `contact_events/${id}`,
    }).then(event => new EventModel(event));
  }

  static async destroy(id) {
    return ApiService.delete({
      url: `contact_events/${id}`,
    });
  }

  static async create(params) {
    return ApiService.post({
      url: 'contact_events',
      body: JSON.stringify({ contact_event: params })
    }).then(event => (
      new EventModel(event)
    ))
  }

  static async update(id, params) {
    return ApiService.put({
      url: `contact_events/${id}`,
      body: JSON.stringify({ contact_event: params }),
    }).then(status => (
      new EventModel(status)
    ))
  }
}

export default EventsService;