import React, { Component } from 'react';
import Details from './compose/details';
import CardDetails from './compose/card-details';

class Compose extends Component {
  state = {
    displayInformations: false,
    displayCardDetails: false,
    status: this.props.card.status(),
  }

  onToggleInformations = () => {
    this.setState(state => ({
      displayInformations: !state.displayInformations,
    }));
  }

  onToggleCardDetails = () => {
    this.setState(state => ({
      displayCardDetails: !state.displayCardDetails,
    }));
  }

  updateStatus = (status) => {
    this.setState({
      status
    })
  }

  statusColor = () => {
    const status = this.state.status;

    if (status === 'pending') {
      return '#FFEF2A';
    } else if (status === 'ready') {
      return '#87FF96';
    }
  }

  render() {
    const {
      props: { card, card: { firstName, lastName, email } },
      state: { displayInformations, displayCardDetails },
    } = this;

    return (
      <div className="compose-element">
        <div className="compose-header">
          <div className="compose-body">
            <div className="info">
              <div className="status" style={{ backgroundColor: this.statusColor() }}></div>
              <span><b>{firstName} {lastName}</b> - {email}</span>
            </div>
          </div>
          <div className="actions">
            <div type="button" className="btn btn-default" aria-label="Left Align" onClick={this.onToggleInformations}>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div type="button" className="btn btn-default" aria-label="Left Align" onClick={this.onToggleCardDetails}>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
        <div className="wrapper">
          {displayInformations ? <Details updateStatus={this.updateStatus} card={card} /> : null}
          {displayCardDetails ? <CardDetails card={card} /> : null}
        </div>
      </div>
    )
  }
}

export default Compose;
