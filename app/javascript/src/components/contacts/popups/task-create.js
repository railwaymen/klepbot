import React, { Component } from 'react';
import UsersService from '../../../services/users-service';
import TaskForm from '../../tasks/task-form';
import PopupWrapper from './popup-wrapper';
import ValidatorHelper from '../../../helpers/validator-helper';
import TasksService from '../../../services/tasks-service';

class TaskCreate extends Component {
  state = {
    users: [],
    taskTypes: [],
    selectedUserId: null,
    selectedTaskTypeId: null,
    description: '',
    sendAt: '',
    title: '',
    errors: {},
  }

  componentDidMount() {
    UsersService.all().then(users => {
      this.setState({ users });
    });

    TasksService.types().then(taskTypes => {
      this.setState({ taskTypes });
    })
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  }

  onSubmit = () => {
    const {
      state: { selectedUserId, description, sendAt, title, selectedTaskTypeId },
      props: { onTaskSubmit, close },
    } = this;

    const validate = new ValidatorHelper();
    validate.presence({ selectedUserId, description, sendAt, title, selectedTaskTypeId });

    if (!validate.isValid()) return this.setState({ errors: validate.errors });

    onTaskSubmit({
      user_id: selectedUserId,
      task_type_id: selectedTaskTypeId,
      description,
      send_at: sendAt,
      title,
    }).then(() => {
      close();
    })
  }

  render() {
    const {
      state: { users, selectedUserId, selectedTaskTypeId, description, sendAt, errors, title, taskTypes },
      props: { contact: { firstName, lastName }, close },
    } = this;

    return (
      <PopupWrapper title={`Task for ${firstName} ${lastName} - ${title}`} close={close}>
        <TaskForm
          onChange={this.onChange}
          users={users}
          taskTypes={taskTypes}
          selectedUserId={selectedUserId}
          selectedTaskTypeId={selectedTaskTypeId}
          description={description}
          sendAt={sendAt}
          title={title}
          onSubmit={this.onSubmit}
          errors={errors}
        />
      </PopupWrapper>
    )
  }
}

export default TaskCreate;
