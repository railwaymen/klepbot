import React, { Component } from 'react';

export default class TaskForm extends Component {
  constructor(props) {
    super(props);

    const { users, selectedUserId } = this.props;

    const searchedUser = users.find(user => user.id === selectedUserId);

    this.state = {
      showUsers: false,
      searchedUser: searchedUser,
      searchUser: searchedUser ? searchedUser.fullName : '',
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
      showUsers: false,
    }, () => {
      onChange({ target: { name: 'selectedUserId', value: id }});
    })
  }

  showUsers = () => {
    this.setState({
      showUsers: true,
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

  render() {
    const {
      props: {
        onChange,
        users,
        selectedUserId,
        description,
        sendAt,
      },
      state: {
        searchUser,
        showUsers,
      }
    } = this;

    return (
      <form className="col form-control-klepbot" onSubmit={this.onSubmitForm}>
        <div className="form-group input-anim-container">
          <label htmlFor="person">Person</label>
          <input
            id="person"
            type="text"
            placeholder="Select person"
            className="form-control"
            value={searchUser}
            onChange={this.onSearchUser}
            name="person"
            autoComplete="off"
            onFocus={this.showUsers}
          />
          {showUsers ?
            <Users
              onSelect={this.onSelectUser}
              value={searchUser}
              selected={selectedUserId}
              list={users}
            /> : null}
          <div className={`border ${!selectedUserId ? 'error' : ''}`}></div>
        </div>

        <div className="form-group input-anim-container">
          <label htmlFor="description">Description</label>
          <div className="border"></div>
          <textarea
            id="description"
            type="text"
            className="form-control"
            placeholder="Write your description message"
            value={description}
            onChange={onChange}
            name="description"
          />
          <div className="border"></div>
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
          <div className="border"></div>
        </div>

        <div className="button-container">
          <input type="submit" readOnly value="Create Task" />
        </div>
      </form>
    )
  }
}

function Users({ list, value, onSelect }) {
  const filterList = list.filter(element => {
    const lowerValue = value.toLowerCase();

    return element.firstName.toLowerCase().match(lowerValue) ||
      element.lastName.toLowerCase().match(lowerValue) ||
      element.fullName.toLowerCase().match(lowerValue)
  })

  return (
    <div className="users-hint">
      {filterList.map(user => (
        <div className="hint" style={{borderColor: user.color}} onClick={() => onSelect(user.id)}>
          <img src={user.avatarUrl} />
          <span>{user.fullName}</span>
        </div>
      ))}
    </div>
  )
}
