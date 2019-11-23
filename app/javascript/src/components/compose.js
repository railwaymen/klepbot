import React, { Component } from 'react';
import Details from './compose/details';
import PossibleName from './compose/possible-name';
import CustomName from './compose/custom-name';

import CardDetails from './compose/card-details';

class Compose extends Component {
  constructor(props) {
    super(props);

    const { card: { status }, card } = this.props;

    this.state = {
      displayInformations: false,
      displayCardDetails: false,
      status: status(),
      card: card
    }
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

  statusColor = () => {
    const status = this.state.status;

    if (status === 'pending') {
      return '#FFEF2A';
    } else if (status === 'ready') {
      return '#87FF96';
    }
  }

  onCardUpdate = (attributes) => {
    const { card } = this.state;

    card.update(attributes).then(card => {
      this.setState({
        card,
        status: card.status()
      })
    })
  }

  render() {
    const {
      state: {
        card, card: { firstName, lastName, email, possibleNames },
        displayInformations, displayCardDetails
      },
    } = this;

    return (
      <div className="compose-element">
        <div className="compose-header">
          <div className="compose-body">
            <div className="info">
              <div className="status" style={{ backgroundColor: this.statusColor() }}></div>
              <span><b>{firstName} {lastName}</b> - {email}</span>

              <div className="possible-names">
                {possibleNames.map(fullName => (
                  <PossibleName name={fullName} key={fullName} onNameSelect={this.onCardUpdate} />
                ))}

                <CustomName updateName={this.onCardUpdate} />
              </div>
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
          {displayInformations ? <Details onCardUpdate={this.onCardUpdate} card={card} /> : null}
          {displayCardDetails ? <CardDetails card={card} /> : null}
        </div>
      </div>
    )
  }
}

export default Compose;
