import React, { Component } from 'react';
import Details from './compose/details';

class Compose extends Component {
  state = {
    displayInformations: false,
    displayCardDetails: false,
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

  render() {
    const {
      props: { card, card: { firstName, lastName, email } },
      state: { displayInformations },
    } = this;

    return (
      <div className="compose-element">
        <div className="compose-body">
          <div className="status"></div>
          <span>{firstName} {lastName} - {email}</span>
        </div>
        <div className="actions">
          <div onClick={this.onToggleInformations}>Click me</div>
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        </div>
        {displayInformations ? <Details card={card} /> : null}
        {displayCardDetails ? <CardDetails {...card} /> : null}
      </div>
    )
  }
}

export default Compose;
