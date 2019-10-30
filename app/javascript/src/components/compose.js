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
        <div className="compose-body">
          <div className="status" style={{ backgroundColor: this.statusColor() }}></div>
          <span>{firstName} {lastName} - {email}</span>
        </div>
        <div className="actions">
          <div onClick={this.onToggleInformations}>Click me</div>
          <div onClick={this.onToggleCardDetails}>Click me2</div>
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
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
