import ApiService from './api-service';
import DataPeriodModel from '../models/data-period-model';

class StatsService {
  static async contactsStats(period = 'month', from = '', to = '', userId = '') {
    return ApiService.get({
      url: `stats/period_users_gain?period=${period}&from=${from}&to=${to}&user_id=${userId}`
    }).then(userPeriods => userPeriods.map(userPeriod => new DataPeriodModel(userPeriod)));
  }

  static async eventsStats(period = 'month', from = '', to = '', eventId = '') {
    return ApiService.get({
      url: `stats/period_events_gain?period=${period}&from=${from}&to=${to}&event_id=${eventId}`
    }).then(userPeriods => userPeriods.map(userPeriod => new DataPeriodModel(userPeriod)));
  }
}

export default StatsService;
