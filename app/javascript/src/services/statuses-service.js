import ApiService from './api-service';
import StatusModel from '../models/status-model';

class StatusesService {
  static async all() {
    return ApiService.get({
      url: 'contact_statuses',
    }).then(statuses => (
      statuses.map(status => new StatusModel(status))
    ))
  }

  static async find(id) {
    return ApiService.get({
      url: `contact_statuses/${id}`,
    }).then(status => new StatusModel(status));
  }

  static async destroy(id) {
    return ApiService.delete({
      url: `contact_statuses/${id}`,
    });
  }

  static async create(params) {
    return ApiService.post({
      url: 'contact_statuses',
      body: JSON.stringify({ contact_status: params }),
    }).then(status => (
      new StatusModel(status)
    ))
  }

  static async update(id, params) {
    return ApiService.put({
      url: `contact_statuses/${id}`,
      body: JSON.stringify({ contact_status: params }),
    }).then(status => (
      new StatusModel(status)
    ))
  }
}

export default StatusesService;