import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import StatusModel from '../models/status-model';

import NotificationsContext from '../contexts/notifications-context';

import StatusForm from '../components/statuses/status-form';
import StatusesService from '../services/statuses-service';

class Status extends Component {
  static contextType = NotificationsContext;

  state = {
    status: new StatusModel({}),
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) StatusesService.find(id).then(status => this.setState({ status }))
  }

  onChange = ({ value, name }) => {
    let { status } = this.state;

    status[name] = value;
    this.setState({ status });
  }

  onStatusSave = () => {
    const {
      state: { status, status: { id } },
      context: { pushNotification }
    } = this;

    StatusesService.create(status.toParams()).then(fetchedStatus => {
      this.setState({
        status: id ? fetchedStatus : new StatusModel({}),
      }, () => {
        pushNotification({
          header: 'Success!',
          type: 'success',
          body: `Your status have been ${id ? 'updated' : 'created'}`,
        })
      });
    }).catch(e => {
      pushNotification({
        header: 'Error!',
        type: 'error',
        body: `There was an error while trying to save status ${e.message}`,
      })
    });
  }

  render() {
    const { status } = this.state;

    return (
      <div className="container">
        <div className="row">
          <h2>Create status</h2>
          <StatusForm
            onChange={this.onChange}
            saveChanges={this.onStatusSave}
            {...status}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Status);