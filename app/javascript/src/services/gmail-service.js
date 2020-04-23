import ApiService from './api-service';

export default class Gmail {
  static grant(search) {
    return ApiService.get({
      url: `gmail/grant${search}`
    });
  }
}
