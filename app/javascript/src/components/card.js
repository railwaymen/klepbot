import React, { Component } from 'react';
import PossibleName from './cards/possible-name';
import CustomName from './cards/custom-name';

import CardDetails from './cards/card-details';

class Compose extends Component {
  constructor(props) {
    super(props);

    const { card: { status }, card } = this.props;

    this.state = {
      displayCardDetails: false,
      status: status(),
      card: card
    }
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
        displayCardDetails
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
            <div className="btn btn-light toggle-action" onClick={this.onToggleCardDetails}>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
        <div className="wrapper">
          {displayCardDetails ? <CardDetails card={card} /> : null}
        </div>
      </div>
    )
  }
}

export default Compose;
