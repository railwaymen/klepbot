import React, { Component } from 'react';
import UsersService from '../../services/users-service';

class TaskCreate extends Component {
  state = {
    users: [],
    expanded: false,
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

  render() {
    const { expanded } = this.state;

    if (expanded) {
      return (
        <div className="task">
        <div onClick={this.toggleExpand} className="task-bar">
          <div>
            <span>Task</span>
          </div>
          <div className="actions">
            <i className="fas fa-chevron-down"></i>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="task-body">
          <form className="col form-control-klepbot">
            <div className="form-group input-anim-container">
              <label htmlFor="person">Person</label>
              <input
                id="person"
                type="text"
                placeholder="Select person"
                className="form-control"
                // value={name}
                // onChange={this.onChange}
                name="person"
              />
              <div className="border"></div>
            </div>

            <div className="form-group input-anim-container">
              <label htmlFor="description">Description</label>
              <div className="border"></div>
              <textarea
                id="description"
                type="text"
                className="form-control"
                placeholder="Write your description message"
                // value={body}
                // onChange={this.onChange}
                name="description"
              />
              <div className="border"></div>
            </div>
            <div className="form-group input-anim-container">
              <label htmlFor="time">Send at</label>
              <input
                id="time"
                type="date"
                placeholder="Select time"
                className="form-control"
                // value={name}
                // onChange={this.onChange}
                name="time"
              />
              <div className="border"></div>
            </div>

            <div className="button-container">
              <input type="submit" readOnly value="Create Task" />
            </div>
          </form>
        </div>
      </div>
      )
    }

    return (
      <div className="task">
        <div onClick={this.toggleExpand} className="task-bar">
          <div>
            <span>Task</span>
          </div>
          <div className="actions">
            <i className="far fa-window-minimize"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskCreate;
