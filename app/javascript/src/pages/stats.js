import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas
} from 'react-vis';
import StatsService from '../services/stats-service';

export default class Stats extends React.Component {
  state = {
    useCanvas: false,
    userPeriods: []
  }

  componentDidMount() {
    StatsService.periodGain().then(userPeriods => {
      this.setState({
        userPeriods
      });
    })
  }

  calcDataForUserPeriod = (userPeriod) => {
    let data = [];

    userPeriod.periods.forEach((_el, i) => {
      data.push({
        x: userPeriod.periods[i],
        y: userPeriod.counts[i],
      })
    })

    return data;
  }

  render() {
    const { useCanvas } = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

    const { userPeriods } = this.state;

    return (
      <div>
        <XYPlot width={500} height={500} stackBy="y">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {userPeriods.map(userPeriod => (
            <BarSeries title={userPeriod.user_name} data={this.calcDataForUserPeriod(userPeriod)} />
          ))}
        </XYPlot>
      </div>
    );
  }
}

