import ApiService from './api-service';

class StatsService {
  static async periodGain(period = 'month') {
    return ApiService.get({
      url: `stats/period_users_gain?period=${period}`
    })
    // .then((period) => {

    // })
  }
}

export default StatsService;
