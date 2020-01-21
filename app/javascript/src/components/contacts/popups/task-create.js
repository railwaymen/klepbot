import React, { Component } from 'react';
import UsersService from '../../../services/users-service';
import TaskForm from '../../tasks/task-form';
import PopupWrapper from './popup-wrapper';
import ValidatorHelper from '../../../helpers/validator-helper';

class TaskCreate extends Component {
  state = {
    users: [],
    selectedUserId: null,
    description: '',
    sendAt: '',
    errors: {},
  }

  componentDidMount() {
    UsersService.all().then(users => {
      this.setState({ users });
    })
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  }

  onSubmit = () => {
    const {
      state: { selectedUserId, description, sendAt },
      props: { onTaskSubmit, close },
    } = this;

    const validate = new ValidatorHelper();
    validate.presence({ selectedUserId, description, sendAt });

    if (!validate.isValid()) return this.setState({ errors: validate.errors });

    onTaskSubmit({
      user_id: selectedUserId,
      description,
      send_at: sendAt,
    }).then(() => {
      close();
    })
  }

  render() {
    const {
      state: { users, selectedUserId, description, sendAt, errors },
      props: { contact: { firstName, lastName }, close },
    } = this;

    return (
      <PopupWrapper title={`Task for ${firstName} ${lastName}`} close={close}>
        <TaskForm
          onChange={this.onChange}
          users={users}
          selectedUserId={selectedUserId}
          description={description}
          sendAt={sendAt}
          onSubmit={this.onSubmit}
          errors={errors}
        />
      </PopupWrapper>
    )
  }
}

export default TaskCreate;
