import React, { Component } from 'react';
import UsersService from '../../services/users-service';
import TaskForm from './task-form';

class TaskCreate extends Component {
  state = {
    users: [],
    expanded: false,
    selectedUserId: null,
    description: '',
    sendAt: '',
  }

  componentDidMount() {
    UsersService.all().then(users => {
      this.setState({ users });
    })
  }

  toggleExpand = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }));
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  }

  onSubmit = () => {

  }

  render() {
    const {
      state: { expanded, users, selectedUserId, description, sendAt },
      props: { contact: { firstName, lastName } },
    } = this;

    if (expanded) {
      return (
        <div className="task">
        <div onClick={this.toggleExpand} className="task-bar">
          <div>
            <span>Task for - {firstName} {lastName}</span>
          </div>
          <div className="actions">
            <i className="fas fa-chevron-down"></i>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="task-body">
          <TaskForm
            onChange={this.onChange}
            users={users}
            selectedUserId={selectedUserId}
            description={description}
            sendAt={sendAt}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
      )
    }

    return (
      <div className="task">
        <div onClick={this.toggleExpand} className="task-bar">
          <div>
            <span>Task for - {firstName} {lastName}</span>
          </div>
          <div className="actions">
            <i className="far fa-window-minimize"></i>
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskCreate;
