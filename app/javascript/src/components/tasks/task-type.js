import React, { useState } from 'react';

export default function TaskType({ searchTaskType, onChange, onSelectTaskType, selectedTaskTypeId, list, errors }) {
  const [showTaskTypes, setShowTaskTypes] = useState(false);

  return (
    <div className="form-group input-anim-container">
      <label htmlFor="type">Type</label>
      <input
        type="text"
        placeholder="Type"
        className="form-control"
        value={searchTaskType}
        onChange={onChange}
        name="type"
        autoComplete="off"
        onFocus={() => setShowTaskTypes(true)}
      />
      {showTaskTypes ?
        <TaskTypes
          onClick={() => setShowTaskTypes(false)}
          onSelect={onSelectTaskType}
          value={searchTaskType}
          selected={selectedTaskTypeId}
          list={list}
        /> : null}
      <div className={`border ${errors ? 'error' : ''}`}></div>
    </div>
  )
}

function TaskTypes({ list, onSelect, value, onClick }) {
  const filterList = list.filter(element => {
    const lowerValue = value.toLowerCase();

    return element.name.toLowerCase().match(lowerValue);
  })

  return (
    <div className="users-hint" onClick={onClick}>
      {filterList.map(type => (
        <Type {...type} key={type.id} onSelect={onSelect} />
      ))}
    </div>
  )
}

function Type({ color, id, name, onSelect }) {
  const onSelectTaskType = () => onSelect(id);

  return (
    <div className="hint" style={{color: color}} onClick={onSelectTaskType}>
      <span>{name}</span>
    </div>
  )
}
