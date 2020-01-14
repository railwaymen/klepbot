import React, { Component } from 'react';
import { Link } from "react-router-dom";
import StatusesService from '../services/statuses-service';

import NotificationsContext from '../contexts/notifications-context';
import { displayErrorMessages } from '../helpers/errors-helpers';

class Statuses extends Component {
  static contextType = NotificationsContext;

  state = {
    statuses: [],
  }

  componentDidMount() {
    StatusesService.all().then(statuses => {
      this.setState({ statuses });
    })
  }

  onDelete = (id) => {
    const { pushNotification } = this.context;

    StatusesService.destroy(id).then(() => {
      const { statuses } = this.state;

      const filteredStatuses = statuses.filter(status => status.id !== id);
      this.setState({ statuses: filteredStatuses }, () => {
        pushNotification({
          header: 'Success!',
          type: 'success',
          body: `Your status have been removed`,
        })
      });
    }).catch(errors => {
      pushNotification({
        header: 'Error!',
        type: 'error',
        body: `There was an error while trying to remove status: ${displayErrorMessages(errors)}`,
      });
    });
  }

  render() {
    const { statuses } = this.state;

    return (
      <div className="container">
        <h2>Statuses</h2>
        <Link to="/statuses/new">New</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Actions</th>
              <th>ID</th>
              <th>Name</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            { statuses.map(status => (
              <Status
                key={status.id}
                {...status}
                onDelete={this.onDelete}
              />
            )) }
          </tbody>
        </table>
      </div>
    )
  }
}

function Status({ id, name, color, onDelete }) {
  const onDeleteItem = () => onDelete(id);

  return (
    <tr>
      <td>
        <Link to={`/statuses/${id}/edit`}><i className="far fa-edit"></i></Link>
        <a href="javascript:void(0)" onClick={onDeleteItem}><i className="far fa-trash-alt"></i></a>
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{color}</td>
    </tr>
  )
}

export default Statuses;