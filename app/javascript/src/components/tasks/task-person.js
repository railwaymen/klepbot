import React, { useState } from 'react';

export default function TaskPerson({ errors, searchUser, onSelectUser, onChange, list, selectedUserId }) {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <div className="form-group input-anim-container">
      <label htmlFor="person">Person</label>
      <input
        id="person"
        type="text"
        placeholder="Select person"
        className="form-control"
        value={searchUser}
        onChange={onChange}
        name="person"
        autoComplete="off"
        onFocus={() => setShowUsers(true)}
      />
      {showUsers ?
        <Users
          onClick={() => setShowUsers(false)}
          onSelect={onSelectUser}
          value={searchUser}
          selected={selectedUserId}
          list={list}
        /> : null}
      <div className={`border ${errors ? 'error' : ''}`}></div>
    </div>
  )
}

function Users({ list, value, onSelect, onClick }) {
  const filterList = list.filter(element => {
    const lowerValue = value.toLowerCase();

    return element.firstName.toLowerCase().match(lowerValue) ||
      element.lastName.toLowerCase().match(lowerValue) ||
      element.fullName.toLowerCase().match(lowerValue)
  })

  return (
    <div className="users-hint" onClick={onClick}>
      {filterList.map(user => (
        <User {...user} key={user.id} onSelect={onSelect} />
      ))}
    </div>
  )
}

function User({ id, color, onSelect, fullName, avatarUrl }) {
  const onSelectUser = () => onSelect(id);

  return (
    <div className="hint" style={{borderColor: color}} onClick={onSelectUser}>
      <img src={avatarUrl} />
      <span>{fullName}</span>
    </div>
  )
}
