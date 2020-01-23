import ApiService from './api-service';
import TaskModel from '../models/task-model';

class TasksService {
  static create({ contactId, params }) {
    return ApiService.post({
      url: `contacts/${contactId}/tasks`,
      body: JSON.stringify({
        task: params,
        zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    }).then(task => new TaskModel(task));
  }

  static contactTasks() {
    return ApiService.get({
      url: `contacts/${contactId}`,
      body: params,
    }).then(tasks => tasks.map(task => new TaskModel(task)));
  }
}

export default TasksService;
