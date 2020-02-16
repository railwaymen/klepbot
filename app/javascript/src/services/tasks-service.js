import ApiService from './api-service';
import TaskModel from '../models/task-model';
import TaskTypeModel from '../models/task-type-model';

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

  static types() {
    return ApiService.get({
      url: 'task_types',
    }).then(taskTypes => taskTypes.map(taskType => new TaskTypeModel(taskType)));
  }
}

export default TasksService;
