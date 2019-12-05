import React, { Component } from 'react';

import EmailTemplatesContext from '../contexts/email-templates-context';

import Compose from '../components/compose';

import CardsService from '../services/cards-service';
import EmailTemplatesService from '../services/email-templates-service';

class Dashboard extends Component {
  state = {
    cards: [],
    templates: [],
    filteredCards: [],
  }

  componentDidMount() {
    CardsService.all().then(cards => {
      this.setState({ cards, filteredCards: cards });
    })

    EmailTemplatesService.all().then(templates => {
      this.setState({ templates });
    })
  }

  filterCardsPattern = ({ value }) => {
    const cards = this.state.cards;

    if (value === '' || value === undefined) return cards;

    return cards.filter(card => (
      card.metadata.toLowerCase().match(value.toLowerCase())
    ))
  }

  onCardsFilter = (e) => {
    const value = e.target.value;

    this.setState({
      filteredCards: this.filterCardsPattern({ value })
    })
  }

  render() {
    const { filteredCards, templates } = this.state;

    return (
      <EmailTemplatesContext.Provider value={{templates}}>
        <div className="container">
          <h1>Cards Dashboard</h1>
          <div className="col-sm-3 my-1">
            <input type="text" className="form-control" onChange={this.onCardsFilter} placeholder="Type to search" />
          </div>
          <div className="compose-containers">
            { filteredCards.length <= 0 ?
              <h2>No results found</h2>
            : filteredCards.map(card => (
              <Compose card={card} key={card.id} />
            ))
            }
          </div>
        </div>
      </EmailTemplatesContext.Provider>
    )
  }
}

export default Dashboard;
