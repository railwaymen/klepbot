import React, { Component, useState } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  Hint
} from 'react-vis';
import 'react-vis/dist/style.css';
import Legend from './shared/legend';
import FilterControl from './shared/filter-control';
import FilterSelect from './shared/filter-select';
import { calcDataForContactsStats } from '../../helpers/stats-helpers';

class EventsStats extends Component {
  constructor(props) {
    super(props);

    this.filters = {}
  }

  onFilterChange = (attributes) => {
    const { onEventsStatsChange } = this.props;

    this.filters = { ...this.filters, ...attributes };

    onEventsStatsChange(this.filters);
  }

  onSelect = (element) => {
    const { onEventsStatsChange } = this.props;

    this.filters.eventId = element.id;

    onEventsStatsChange(this.filters);
  }

  render() {
    const { eventsStats, events } = this.props;

    return (
      <div className="col">
        <FilterControl onFilterChange={this.onFilterChange}>
          <FilterSelect name="eventId" onFilterChange={this.onFilterChange}>
            {events.map(event => (
              <option key={`user-${event.id}`} value={`${event.id}`}>{event.name}</option>
            ))}
          </FilterSelect>
        </FilterControl>
        <Legend data={eventsStats} />
        <Graph eventsStats={eventsStats} />
      </div>
    )
  }
}

function Graph({ eventsStats }) {
  const [hint, setHint] = useState(null);

  return (
    <XYPlot
      height={600}
      width={1100}
      xType="ordinal"
      animation={{duration: 3}}
    >
      { hint ? <Hint value={hint} /> : null }
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      {eventsStats.map(stats => (
        <LineMarkSeries
          onSeriesMouseOut={() => setHint(null)}
          onValueMouseOver={value => setHint(value)}
          stroke={2}
          // key={`bar-${contactsStat.userId}`}
          title={stats.name}
          data={calcDataForContactsStats(stats)}
          style={{strokeWidth: 2, margin: 20}}
          barWidth={0.8}
          color={stats.color}
          lineStyle={{stroke: stats.color}}
        />
      ))}
    </XYPlot>
  )
}

export default EventsStats;