import ApiService from './api-service';
import NotificationModel from '../models/notification-model';

class NotificationsService {
  static all() {
    return ApiService.get({
      url: 'notifications',
    }).then(notifications => (
      notifications.map(notification => new NotificationModel(notification))
    ));
  }
}

export default NotificationsService;
