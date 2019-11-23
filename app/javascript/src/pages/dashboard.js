import React, { Component } from 'react';

import EmailTemplatesContext from '../contexts/email-templates-context';

import Compose from '../components/compose';

import CardsService from '../services/cards-service';
import EmailTemplatesService from '../services/email-templates-service';

class Dashboard extends Component {
  state = {
    cards: [],
    templates: [],
  }

  componentDidMount() {
    CardsService.all().then(cards => {
      this.setState({ cards });
    })

    EmailTemplatesService.all().then(templates => {
      this.setState({ templates });
    })
  }

  render() {
    const { cards, templates } = this.state;

    return (
      <EmailTemplatesContext.Provider value={{templates}}>
        <div className="container">
          <h1>Dashboard</h1>
          <div className="compose-containers">
            {cards.map(card => (
              <Compose card={card} key={card.id} />
            ))}
          </div>
        </div>
      </EmailTemplatesContext.Provider>
    )
  }
}

export default Dashboard;
