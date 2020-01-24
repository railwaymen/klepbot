import React, { Component } from 'react';
import TaskPerson from './task-person';
import TaskType from './task-type';

export default class TaskForm extends Component {
  constructor(props) {
    super(props);

    const { users, selectedUserId } = this.props;
    const { taskTypes, selectedTaskTypeId } = this.props;

    const searchedUser = users.find(user => user.id === selectedUserId);
    const searchedTaskType = taskTypes.find(taskType => taskType.id === selectedTaskTypeId);

    this.state = {
      searchedUser,
      searchUser: searchedUser ? searchedUser.fullName : '',

      searchedTaskType,
      searchTaskType: searchedTaskType ? searchedTaskType.name : '',
    }
  }

  onSubmitForm = (e) => {
    const { onSubmit } = this.props;
    e.preventDefault();

    onSubmit();
  }

  onSelectUser = (id) => {
    const { onChange, users } = this.props;
    const searchedUser = users.find(user => user.id === id);

    this.setState({
      searchUser: searchedUser.fullName,
      searchedUser,
    }, () => {
      onChange({ target: { name: 'selectedUserId', value: id }});
    })
  }

  onSearchUser = ({ target: { value }}) => {
    const { onChange } = this.props;

    this.setState({
      searchUser: value,
    }, () => {
      onChange({ target: { name: 'selectedUserId', value: null }});
    });
  }

  onSelectTaskType = (id) => {
    const { onChange, taskTypes } = this.props;
    const searchedTaskType = taskTypes.find(taskType => taskType.id === id);

    this.setState({
      searchTaskType: searchedTaskType.name,
      searchedTaskType,
    }, () => {
      onChange({ target: { name: 'selectedTaskTypeId', value: id }});
    })
  }

  onSearchTaskType = ({ target: { value }}) => {
    const { onChange } = this.props;

    this.setState({
      searchTaskType: value,
    }, () => {
      onChange({ target: { name: 'selectedTaskTypeId', value: null }});
    });
  }

  render() {
    const {
      props: {
        onChange,
        users,
        taskTypes,
        selectedUserId,
        title,
        description,
        sendAt,
        searchedTaskType,
        selectedTaskTypeId,
        errors,
      },
      state: {
        searchUser,
        searchTaskType,
      }
    } = this;

    return (
      <form className="col form-control-klepbot" onSubmit={this.onSubmitForm}>
        <div className="row">
          <div className="col">
            <TaskPerson
              searchUser={searchUser}
              onChange={this.onSearchUser}
              onSelectUser={this.onSelectUser}
              value={searchUser}
              errors={errors.selectedUserId}
              selected={selectedUserId}
              list={users}
            />
          </div>
          <div className="col">
            <div className="form-group input-anim-container">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={onChange}
                name="title"
              />
              <div className={`border ${errors.title ? 'error' : ''}`}></div>
            </div>
          </div>
          <div className="col">
            <TaskType
              searchTaskType={searchTaskType}
              onChange={this.onSearchTaskType}
              onSelectTaskType={this.onSelectTaskType}
              value={searchedTaskType}
              errors={errors.selectedUserId}
              selected={selectedTaskTypeId}
              list={taskTypes}
            />
          </div>
        </div>
        <div className="form-group input-anim-container">
          <label htmlFor="description">Description</label>
          <div className={`border ${errors.description ? 'error' : ''}`}></div>
          <textarea
            id="description"
            type="text"
            className="form-control"
            placeholder="Write your description message"
            value={description}
            onChange={onChange}
            name="description"
          />
          <div className={`border ${errors.description ? 'error' : ''}`}></div>
        </div>
        <div className="form-group input-anim-container">
          <label htmlFor="sendAt">Send at</label>
          <input
            id="sendAt"
            type="datetime-local"
            placeholder="Select time"
            className="form-control"
            value={sendAt}
            onChange={onChange}
            name="sendAt"
          />
          <div className={`border ${errors.sendAt ? 'error' : ''}`}></div>
        </div>
        <div className="button-container">
          <input type="submit" readOnly value="Create Task" />
        </div>
      </form>
    )
  }
}
