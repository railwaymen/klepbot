import React, { Component } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from 'react-vis';
import 'react-vis/dist/style.css';
import Legend from './shared/legend';
import FilterControl from './shared/filter-control';
import FilterSelect from './shared/filter-select';
import { calcDataForContactsStats } from '../../helpers/stats-helpers';

export default class ContactsStats extends Component {
  constructor(props) {
    super(props);

    this.filters = {}
  }

  onFilterChange = (attributes) => {
    console.log(attributes);
    const { onContactStatsChange } = this.props;

    this.filters = { ...this.filters, ...attributes };

    onContactStatsChange(this.filters);
  }

  render() {
    const { contactsStats, users } = this.props;

    return (
      <div className="col">
        <FilterControl onFilterChange={this.onFilterChange}>
          <FilterSelect name="userId" onFilterChange={this.onFilterChange}>
            {users.map(user => (
              <option key={`user-${user.id}`} value={`${user.id}`}>{user.fullName}</option>
            ))}
          </FilterSelect>
        </FilterControl>
        <Legend data={contactsStats} />
        <Graph contactsStats={contactsStats} />
      </div>
    )
  }
}

function Graph({ contactsStats }) {
  return (
    <XYPlot
      height={600}
      width={1100}
      stackBy="y"
      xType="ordinal"
      colorType="linear"
      animation={{duration: 3}}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      {contactsStats.map(stats => (
        <VerticalBarSeries
          // key={`bar-${contactsStat.userId}`}
          title={stats.name}
          data={calcDataForContactsStats(stats)}
          style={{strokeWidth: 2, margin: 20}}
          barWidth={0.8}
          color={stats.color}
          strokeWidth={2}
        />
      ))}
    </XYPlot>
  )
}
