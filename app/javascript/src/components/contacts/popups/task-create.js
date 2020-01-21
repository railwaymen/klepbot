import React, { Component } from 'react';
import UsersService from '../../../services/users-service';
import TaskForm from '../../tasks/task-form';
import PopupWrapper from './popup-wrapper';

class TaskCreate extends Component {
  state = {
    users: [],
    selectedUserId: null,
    description: '',
    sendAt: '',
  }

  componentDidMount() {
    UsersService.all().then(users => {
      this.setState({ users });
    })
  }

  onChange = ({ target: { name, value } }) => {
    console.log({name, value})

    this.setState({
      [name]: value
    });
  }

  onSubmit = () => {
    const {
      state: { selectedUserId: user_id, description, sendAt: send_at },
      props: { onTaskSubmit },
    } = this;

    onTaskSubmit({
      user_id,
      description,
      send_at,
    }).then(() => {
      close();
    }).catch(() => {
      alert('Catched!')
    })
  }

  render() {
    const {
      state: { users, selectedUserId, description, sendAt },
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
        />
      </PopupWrapper>
    )
  }
}

export default TaskCreate;
