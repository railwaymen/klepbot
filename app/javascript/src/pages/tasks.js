import React, { Component } from 'react';
import TasksService from '../services/tasks-service';

class Tasks extends Component {
  state = {
    userTasks: [],
    assignedTasks: [],
  }

  componentDidMount() {
    // TasksService.all()
  }

  render() {
    const { userTasks, assignedTasks } = this.state;

    return (
      <div className="container">
        <h5>Tasks created by you</h5>
        <TasksList list={userTasks} />
        <h5>Tasks assigned to you</h5>
        <TasksList list={assignedTasks} />
      </div>
    )
  }
}

function TasksList({ list }) {
  return (
    list.map(task => {
      <Task />
    })
  )
}

function Task({  }) {
  return (
    <div className="task">

    </div>
  )
}

export default Tasks;