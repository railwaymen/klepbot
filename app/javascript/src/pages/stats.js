import React from 'react';
import ContactsStats from '../components/stats/contacts-stats';
import EventsStats from '../components/stats/events-stats';

import StatsService from '../services/stats-service';
import UsersService from '../services/users-service';
import EventsService from '../services/events-service';

export default class Stats extends React.Component {
  state = {
    contactsStats: [],
    users: [],
    eventsStats: [],
    events: [],
    selectedTab: 'contacts'
  }

  onSelectTab = (name) => {
    this.setState({ selectedTab: name });
  }

  componentDidMount() {
    StatsService.contactsStats().then(contactsStats => {
      this.setState({ contactsStats });
    });

    StatsService.eventsStats().then(eventsStats => {
      this.setState({ eventsStats });
    });

    UsersService.all().then(users => {
      this.setState({ users })
    });

    EventsService.all().then(events => {
      this.setState({ events })
    });
  }

  onContactStatsChange = ({ period, from, to, userId }) => {
    StatsService.contactsStats(period, from, to, userId).then(contactsStats => {
      this.setState({ contactsStats });
    })
  }

  onEventsStatsChange = ({ period, from, to, eventId }) => {
    StatsService.eventsStats(period, from, to, eventId).then(eventsStats => {
      this.setState({ eventsStats });
    })
  }

  render() {
    const { contactsStats, eventsStats, users, selectedTab, events } = this.state;

    return (
      <div className="container stats">
        <div className="row">
          <Tabs onSelectTab={this.onSelectTab} selected={selectedTab} />
          {selectedTab === 'contacts' ? <ContactsStats
            contactsStats={contactsStats}
            users={users}
            onContactStatsChange={this.onContactStatsChange}
          /> : null}
          {selectedTab === 'events' ? <EventsStats
            eventsStats={eventsStats}
            events={events}
            onEventsStatsChange={this.onEventsStatsChange}
          /> : null}
        </div>
      </div>
    );
  }
}

function Tabs({ onSelectTab, selected }) {
  const tabs = ['contacts', 'events', 'progress', 'emails'];

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div
          key={tab}
          onClick={() => onSelectTab(tab)}
          className={`tab ${selected === tab ? 'selected' : ''}`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </div>
      ))}
    </div>
  )
}

