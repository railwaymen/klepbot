import React, { Component } from 'react';

import EmailTemplatesContext from '../contexts/email-templates-context';

import Card from '../components/card';

import CardsService from '../services/cards-service';
import EmailTemplatesService from '../services/email-templates-service';
import SearchInput from '../components/shared/search-input';

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
          <SearchInput />
          <div className="compose-containers">
            { filteredCards.length <= 0 ?
              <h2>No results found</h2>
            : filteredCards.map(card => (
              <Card card={card} key={card.id} />
            ))
            }
          </div>
        </div>
      </EmailTemplatesContext.Provider>
    )
  }
}

export default Dashboard;
