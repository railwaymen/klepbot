import ApiService from './api-service';
import NotificationModel from '../models/notification-model';

class NotificationsService {
  static all() {
    return ApiService.get({
      url: 'notifications',
    }).then(attributes => {
      const { notifications_count, notifications } = attributes;

      return {
        notificationsCount: notifications_count,
        notifications: notifications.map(notification => new NotificationModel(notification)),
      }
    });
  }

  static readNotifications() {
    return ApiService.post({
      url: 'profile/read_notifications',
    });
  }
}

export default NotificationsService;
